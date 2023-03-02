const mongoose=require('mongoose')
const Schema=mongoose.Schema
const quizSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    questions:[{
        type:Schema.Types.ObjectId,
        ref:'Question'
    }],
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Quiz',quizSchema)