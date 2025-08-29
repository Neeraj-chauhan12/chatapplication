const mongoose = require('mongoose')


  const connectDB = async ()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log(process.env.MONGO_URI)
        console.log("database connect");

    } catch (error) {
        console.log("error in database:",error)
        
    }
 }

  module.exports = connectDB;