const models = require('../models')
const jwt = require('njwt')

exports.login = async (req, response, next) => {
    try{
        const {email, password} = req.body
        const crypto = require('crypto')
        const key = process.env.PASS_ENCRYPTION_KEY
        const algorithm = process.env.PASS_ENCRYPTION_ALGORITHM
        let cipher = crypto.createCipher(algorithm, key)
        let encrypted = cipher.update(password, 'utf8','hex')
        encrypted += cipher.final('hex')
        const user = await models.Users.findOne({ where: { email: email, password: encrypted}})
        if (user){
            user.update({last_login: new Date()})
            var claims = {email: user.email,
                          token: user.token}
            var token = jwt.create(claims, process.env.JWT_SECRET)
            token.setExpiration(new Date().getTime() + 1000*60*60*10)
            return response.status(200).send({idToken: token.compact()})
        }
        return response.status(400).json('Invalid email and pass combo')
    }
    catch(e){
        next(e)
    }
}

exports.signup = async (req, response, next) => {
    try {
        const {email, password} = req.body
        const crypto = require('crypto')
        const algorithm = process.env.PASS_ENCRYPTION_ALGORITHM
        const key = process.env.PASS_ENCRYPTION_KEY
        const hash = crypto.randomBytes(15).toString('hex')
        let cipher = crypto.createCipher(algorithm, key)
        let encrypted = cipher.update(password, 'utf8','hex')
        encrypted += cipher.final('hex')
        user = await models.Users.findOne({where:{email: email}})
        if(!user){
            models.Users.create({email: email, password: encrypted, token: hash+email})
        } else {
            response.status(500).json('User alread exists')
        } 
        response.status(200).json('User created')
    } catch(e){
        next (e)
    }
}