const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const Cookie =require('cookies-parser')

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        require:true,
    }
    // customerId:String,
    // description:String,
})


//hashed password




module.exports = mongoose.model("user",userschema);
