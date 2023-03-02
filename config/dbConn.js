const mongoose=require('mongoose');
const {logEvents}=require('../middleware/logger')
const dbConn=async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser:true,useUnifiedTopology:true,})
        logEvents('Connected to MongoDB','dbConn.log')
        console.log('Connected to MongoDB')
    }
    catch(error){
        logEvents(error.message,'dbError.log')
        console.error(error.message)
    }
}
module.exports=dbConn