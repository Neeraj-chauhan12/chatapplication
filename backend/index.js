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

const allowed=[process.env.FRONTEND_URL,process.env.FRONTEND_URL1]
app.use(cors({
    origin:function(origin,cb){
        if(origin) return cd(null,true)
        if(allowed.indexOf(origin)!== -1)cb(null,true)
            else cb(new Error('not allowed by cors'));
    },
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