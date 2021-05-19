const express=require('express');

const router=express.Router();

const passport=require('passport');

const commentcreate=require('../../../controllers/api/v1/commentApi');

router.post('/crate',passport.authenticate('jwt', {session: false}),commentcreate.createcomment);
router.get('/:id/destroy',passport.authenticate('jwt', {session: false}),commentcreate.destroy);

module.exports=router;