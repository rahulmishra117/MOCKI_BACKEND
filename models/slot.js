const mongoose=require('mongoose');

const slotSchema=new mongoose.Schema({
    day:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
   
}, 
{
    timestamps:true
});


const Slot=mongoose.model('Slot',slotSchema);
module.exports=Slot;