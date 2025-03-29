const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const cookie = require('cookies-parser')
const jwt= require('jsonwebtoken');
const { token } = require('morgan');

exports.signupcontrollers = async(req,res)=>{
    const { name , email, password}= req.body;
    try {
        const existuser=await User.findOne({email})
        if(existuser){
            return res.status(400).json({error:'user already exist here'});
        }
    
        const hashpassword=await bcrypt.hash(password,10);
        const newuser=new User({
            name,
            email,
            password:hashpassword,
        })
        await newuser.save();
        res.status(201).json({message:"user register successfuly",newuser:{
            name:newuser.name,
            email:newuser.email,
            password:newuser.password
        }});
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error in server"});
        
    }

   
    
};
 exports.logincontrollers = async(req,res)=>{
    const {email,password}=req.body;
  try {

   const newuser= await User.findOne({email});
   if(!newuser){
    return res.status(400).json({error:"invalid credential"});
   }

   const ismatch= await bcrypt.compare(password, newuser.password);
   if(!ismatch){
    return res.status(400).json({error:"password is not match"});
   } 
   const token=jwt.sign({id:newuser._id},
     process.env.JWT_ACCESS_SECRET,{
        expiresIn:"1h",
     });

     res.cookie("token",token);

     res.json({message:"login succeccfull",newuser:{
        name:newuser.name,
        email:newuser.email
     }})
    

  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server"});
    
  }

 };
exports.logoutcontrollers = async(req,res)=>{
    res.clearCookie("token")
    res.json({message:"logout successfully!!!"});

};



// userschema.pre("save",async function(next) {
//     if(!this.isModified("password")){
//         next();
//     }

//     this.password=await bcrypt.hash(this.password,10);
//     console.log(this.password);
//     next();
    
// });


// //match password

// userschema.methods.matchpassword=async function(password) {
//     return await bcrypt.compare(password,this.password)
    
// }

// //sign token

// userschema.methods.getsigntoken=function(res){
//     const accesstoken= jwt.sign({id:thid._id},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIREDIN});
//     const refreshtoken=jwt.sign({id:this._id},process.envJWT_REFRESH_TOKEN,{expiredIn:process.env.JWT_REFRESH_EXPIREDIN});


// res.Cookie("refreshtoken",`${refreshtoken}`,{
//     maxAge:86400 * 7000,
//     htttOnly:true,
// })
// };