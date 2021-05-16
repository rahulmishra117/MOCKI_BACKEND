const express=require('express');
const router=express.Router();

// For Interviwer Profile
router.use('/interview',require('./interviwer'));

// For User Profile
router.use('/user',require('./user'))

// route for report of user
router.use('/report', require('./report'));
module.exports=router;