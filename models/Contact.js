const mongoose=require('mongoose')
const Schema=mongoose.Schema
const contactSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
        minLength:3
    },
    phone:{
        type:String,
        required:true,
        minLength:10
    },
    email:{
        type:String,
        lowercase:true,
       },
       address:{
        
            street:String,
            city:String
        }


})
module.exports = mongoose.model('Contact', contactSchema);

    