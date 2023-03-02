const Contact=require('../models/Contact')
const User=require('../models/Users')
//@desc create a new contact
//@route POST /contacts/create
//@access private
const createContact=async (req,res)=>{
    console.log(req.body)
    try{
        const {name,email,phone,type}=req.body
        const contact=await Contact.create({
            name,
            email,
            phone,
            type,
            user:req.user._id
        })
        res.status(200).json({success:true,data:contact})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc get all contacts
//@route GET /contacts
//@access private
const getContacts=async (req,res)=>{
    console.log(req.user._id)
    try{
        const contacts=await Contact.find({user:req.user._id}).lean()
        res.status(200).json({success:true,data:contacts})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc get a contact
//@route GET /contacts/:id
//@access private
const getContact=async (req,res)=>{
    try{
        const contact=await Contact.findById(req.params.id).lean()
        if(!contact){
            return res.status(400).json({success:false,error:'No contact found'})
        }
        res.status(200).json({success:true,data:contact})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc update a contact
//@route PUT /contacts/:id
//@access private
const updateContact=async (req,res)=>{
    try{
        const contact=await Contact.findById(req.params.id).lean()
        if(!contact){
            return res.status(400).json({success:false,error:'No contact found'})
        }
        const {name,email,phone,type}=req.body
        if(name){
            contact.name=name
        }
        if(email){
            contact.email=email
        }
        if(phone){
            contact.phone=phone
        }
        if(type){
            contact.type=type
        }
        await contact.save()
        res.status(200).json({success:true,data:contact})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
//@desc delete a contact
//@route DELETE /contacts/:id
//@access private
const deleteContact=async (req,res)=>{
    try{
        const contact=await Contact.findById(req.params.id).lean()
        if(!contact){
            return res.status(400).json({success:false,error:'No contact found'})
        }
        await contact.remove()
        res.status(200).json({success:true,data:{}})
    }
    catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}
module.exports={
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
}
