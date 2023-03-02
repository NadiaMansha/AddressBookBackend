const User=require('../models/Users')
const jwt=require('jsonwebtoken')
const { use } = require('../routes/contactRoute')
const SECRET='9d0993439adfcca037ad457e2b489ebf76fd6efabda9a1e83b2353e76525c21451f4f6f7ed9dde22366cdfaf164a966d81773f7cd7952e1aec1a46c1b47629bb'
const Authorize=async (req,res,next)=>{
    
    const authorization=req.headers['authorization']
    const token=authorization && authorization.split(' ')[1]
  
    if(!token){
        return res.status(401).json({success:false,error:'Unauthorized'})
    }
    try{
        const decoded=await jwt.verify(token,SECRET)
        const user=await User.findById(decoded.id).select('-password').lean().exec()
        if(!user){
            return res.status(401).json({success:false,error:'Unauthorized'})
        }

        req.user=user
       
        next()
    }

    catch(error){
        return res.status(401).json({success:false,error:'Unauthorized'})
    }
}


module.exports=Authorize