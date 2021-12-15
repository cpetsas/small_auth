const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Users extends Sequelize.Model {}
    Users.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true   
        },
        token: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING
        },
    }, {
        sequelize,
        modelName: 'users'});
    
    return Users 
}