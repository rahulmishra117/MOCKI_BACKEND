const express=require('express');
const router=express.Router();
const passport=require('passport');

const postcreate=require('../../../controllers/api/v1/postApi');

router.post('/create',passport.authenticate('jwt', {session: false}),postcreate.createPost);

router.get('/:id/destroy',passport.authenticate('jwt', {session: false}),postcreate.destroypost);

module.exports=router;