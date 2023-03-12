const mongoose=require('mongoose');
const User=require('../models/Users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const SECRET='9d0993439adfcca037ad457e2b489ebf76fd6efabda9a1e83b2353e76525c21451f4f6f7ed9dde22366cdfaf164a966d81773f7cd7952e1aec1a46c1b47629bb'

// @desc    Get all users
// @route   GET /users
// @access  private
const getUsers=async (req,res)=>{
    console.log("calling getusers function")
    try{
        const users=await User.find().select('-password').lean()
        res.status(200).json({success:true,count:users.length,data:users})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc create a new user
//@route POST /users/create
//@access public
const createUser=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body
        //check data 
        if(!name || !email || !password ){
            return res.status(400).json({success:false,error:'Please provide all the fields'})
        }
        //check duplicate
        const duplicate= await User.findOne({email}).lean().exec()
        if(duplicate){
            return res.status(400).json({success:false,error:'Email already exists'})
        }
        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        //create user
         const user=await User.create({name,email,"password":hashedPassword,role})
        if(user){
            const token=jwt.sign({id:user._id},SECRET,)
            res.cookie(
                'token',
                token,
                {
                    httpOnly:true,
                    expires:new Date(Date.now()+86400000)
                }
            ) 
            res.status(200).json({success:true,data:user,token})
        }
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc get a user
//@route GET /users/:id
//@access private
const getUser=async (req,res)=>{
    try{
        const user=await User.findById(req.params.id).select('-password').lean()
        if(!user){
            return res.status(400).json({success:false,error:'No user found'})
        }
        res.status(200).json({success:true,data:user})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc update a user
//@route PUT /users/:id
//@access private
const updateUser=async (req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({success:false,error:'No user found'})
        }
        const {name,email,password,role}=req.body
        if(name){
            user.name=name
        }
        if(email){
            user.email=email
        }
        if(password){
            const hashedPassword=await bcrypt.hash(password,10)
            user.password=hashedPassword
        }
        if(role){
            user.role=role
        }
        await user.save()
        return res.status(200).json({success:true,token})

    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc delete a user
//@route DELETE /users/:id
//@access private
const deleteUser=async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({success:false,error:'No user found'})
        }
        await user.remove()
        res.status(200).json({success:true,data:{}})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc loginUser
//@route POST /users/login
//@access public
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({success:false,error:'Please provide email and password'})
        }
        const user=await User.findOne({email}).lean()
        if(!user){
            return res.status(400).json({success:false,error:'Invalid credentials'})
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({success:false,error:'Invalid credentials'})
        }
        const token=jwt.sign({id:user._id},SECRET,{expiresIn:'1d'})
        res.cookie(
            'token',
            token,
            {
                httpOnly:true,
                expires:new Date(Date.now()+86400000)
            }
        )
        res.status(200).json({success:true,data:user,token})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}

module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}



   
  
