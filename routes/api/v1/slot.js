const express=require('express');
const passport=require('passport');
const router=express.Router();
const slotbook=require('../../../controllers/api/v1/slotApi');

router.post('/book',slotbook.createslot);


module.exports=router;