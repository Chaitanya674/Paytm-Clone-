const mongoose = require('mongoose');

const User_Schema = mongoose.Schema({
    name : String, 
    lastname : String,
    password : String
})

const User = mongoose.model('users' , User_Schema);

module.exports = {
    User
}