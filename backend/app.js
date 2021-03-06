const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const host = process.env.HOST
const port = process.env.PORT

var index = require('./routes/index')
var models = require('./models')

models.sequelize.sync({alter: true})
// const formData = require("express-form-data");

let app=express()
app.use(cors())
// app.use(formData.parse());
// app.use(formData.format());
// app.use(formData.stream());
// app.use(formData.union());

app.use(bodyParser.json());
app.use(express.urlencoded());
app.get('/',function (req, res){
    res.send('Something went wrong')
})

app.use('/', index)

let server = app.listen(port, function(){
    console.log('Server running')
})