const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({

username:String,
name:String,
PasswordHash:String,


});

module.exports = mongoose.model('User',userSchema, 'users');