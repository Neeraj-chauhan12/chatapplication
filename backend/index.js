const express = require('express')
const connectDB =require('./config/db.js')
const dotenv =require('dotenv')
const userrouter= require('./routers/userrouters.js')
const cors = require("cors")
const path= require("path")

const app=express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","UPDATE","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization","X-Requested-With"]
 
}))


//database connection
const PORT=process.env.PORT || 4000
connectDB();

//routers
app.use("/user",userrouter)


//app is running here 
app.listen(PORT, ()=>{
    console.log(`app is running in port ${PORT}`);
});