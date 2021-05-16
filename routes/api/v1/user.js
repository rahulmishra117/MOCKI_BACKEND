const express=require('express');
const router=express.Router();

const passport = require("passport");

// requiring user controller
const userRequests = require('../../../controllers/api/v1/userApi');

// post req to register user
router.post('/register', passport.authenticate('jwt', {session: false}), userRequests.registeruser);

// post request to create report of users
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), userRequests.createuserReport);

// get request to obtain all reports of a specific user
router.get('/:id/all_report', passport.authenticate('jwt', {session: false}), userRequests.allReports);


module.exports=router;