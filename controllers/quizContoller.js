import Quiz from '../models/Quiz.js'
import Question from '../models/Question.js'
import User from '../models/User.js'
import {validationResult} from 'express-validator'
//@createQuiz
//@route POST /api/quiz
//@access Private
const createQuiz=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {title,description,questions}=req.body
    try{
        const quiz=await Quiz.create({
            title,
            description,
            questions,
            user:req.user.id
        })
        res.status(200).json({quiz})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
//@desc get all quizzes
//@route GET /api/quiz
//@access Public
const getQuizzes=async(req,res)=>{
    try{
        const quizzes=await Quiz.find().lean().exec() //lean() returns a plain javascript object
        res.status(200).json({quizzes})
    }
      catch(err){
        res.status(500).json({error:err.message})
    }
}
//@desc get quiz by id
//@route GET /api/quiz/:id
//@access Public
const getQuizById=async(req,res)=>{
    try{
        const quiz=await Quiz.findById(req.params.id).lean().exec()  //lean() returns a plain javascript object
        res.status(200).json({quiz})
    }
        catch(err){
        res.status(500).json({error:err.message})
    }
}
//@desc delete quiz by id
//@route DELETE /api/quiz/:id
//@access Public
const deleteQuizById=async(req,res)=>{
    try{
        const quiz=await Quiz.findByIdAndDelete(req.params.id).lean().exec()  //lean() returns a plain javascript object
        res.status(200).json({msg:'Quiz deleted successfully'})
    }
        catch(err){
        res.status(500).json({error:err.message})
    }
}
//@desc update quiz by id
//@route PUT /api/quiz/:id
//@access Public
const updateQuizById=async(req,res)=>{
    try{
       const quiz= await Quiz.findById(req.params.id)
       if(!quiz){
              res.status(404).json({msg:'Quiz not found'})
         }
         else{
                quiz.title=req.body.title || quiz.title
                quiz.description=req.body.description || quiz.description
                quiz.questions=req.body.questions || quiz.questions
                quiz.user=req.body.user || quiz.user
                quiz.date=req.body.date || quiz.date
                await quiz.save()
                res.status(200).json({quiz})
         }
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports={
    createQuiz,
    getQuizzes,
    getQuizById,
    deleteQuizById,
    updateQuizById
}


