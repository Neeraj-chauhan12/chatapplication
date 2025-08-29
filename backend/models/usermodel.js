const mongoose = require('mongoose')


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

module.exports = mongoose.model("user",userschema);
