const jwt = require('jsonwebtoken')

exports.usermiddleware = async(req,res,next)=>{
    // const token=req.cookies.jwt;
    
    
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({messsage:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        req.user=decoded;
        next();
        
    } catch (error) {
       return res.status(403).json({message:"invalid token"})
        
    }

}