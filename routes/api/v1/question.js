const express=require('express');

const router=express.Router();

const question=require('../../../controllers/api/v1/postquestionApi');

router.post('/question',question.createQuesionPost);

module.exports=router;