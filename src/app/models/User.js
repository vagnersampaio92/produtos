const bcrypt = require('bcryptjs')
const  jwt=require ('jsonwebtoken')



module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        name:DataTypes.STRING,
        email:DataTypes.STRING,
    })

    
    return User
}