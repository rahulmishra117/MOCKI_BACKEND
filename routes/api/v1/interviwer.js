const express=require('express');
const router=express.Router();
const passport=require('passport');
const interviewuse=require('../../../controllers/api/v1/interviewerApi');

// post req for registering doctor
router.post('/register', interviewuse.createinterviwer);

// authenticated login request for
router.post('/login',passport.authenticate('local', { session:false}), interviewuse.logininterviewer);


module.exports=router;