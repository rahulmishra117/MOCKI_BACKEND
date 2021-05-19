// Models for interviewer to post the question
const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    }

})
const Question=mongoose.model('Question',questionSchema);
module.exports=Question;