const express=require('express');
const router=express.Router();

// For Interviwer Profile
router.use('/interview',require('./interviwer'));

// For User Profile
router.use('/user',require('./user'))

// route for report of user
router.use('/report', require('./report'));

// Post and Comment for the user
router.use('/post',require('./post'));

// User can create and read the comment
router.use('/comment',require('./comment'));

// User can Book their Slot 
router.use('/slot',require('./slot'));

// Interviewer Can add the Question
router.use('/question',require('./question'));

module.exports=router;