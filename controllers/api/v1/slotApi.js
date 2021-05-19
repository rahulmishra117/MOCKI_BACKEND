const Slot = require('../../../models/slot');

let slotdayarray=['monday','tuesday','wednessday','thursday','friday','saturday','sunday'];



module.exports.createslot=async function(request,response){
    try{
        const { day } = request.body
        const {date } =request.body
        const { time} =request.body 

        let slot = await Slot.create({
            day,date,time
           
        })

        return response.status(201).json(slot);


    }catch(err){
        return response.json(500,{
            status:500,
            message:'Internal Server Error!!'
        });
    }
}