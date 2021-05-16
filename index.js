const express=require('express');
const app=express();

const port =  process.env.PORT
const db = require('./config/mongoose');

app.use(express.urlencoded());

// using passport for authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(passport.initialize());


app.use('/', require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log('Error in the Running Port!!',err);
    }
    console.log('Port is working fine',port);
})