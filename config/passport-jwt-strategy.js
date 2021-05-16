const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const INTERVIEWER = require('../models/interviewer');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
     secretOrKey: process.env.JWT_SECRET_KEY
    
}

// authenticate using passport-jwt
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    
    INTERVIEWER.findById(jwtPayLoad._id, function(err, interviewer){
        if(err){console.log('Error in finding INTERVIEWER from JWT'); return;}

        if(interviewer){
            return done(null, interviewer);
        } else{
            return done(null, false);
        }
    })

}));

module.exports = passport;