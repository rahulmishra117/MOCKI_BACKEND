const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const INTERVIEWER = require('../models/interviewer');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'username',
    passReqToCallback: true
},
    function (req, username, password, done) {
        // find a user and establish the identity
        INTERVIEWER.findOne({ username: username }, function (err, INTERVIEWER) {
            if (err) {
                console.log('Error finding user')
                return done(err);
            }

            if (!INTERVIEWER || INTERVIEWER.password != password) {
                console.log('Invalid Username/Password!');
                return done(null, false, {
                    message: 'Invalid Username or Password'
                });
            }

            else {
                console.log(INTERVIEWER);
                return done(null, INTERVIEWER, {
                    message: 'Logged in Successfully!'
                });
            }
        });
    }
));

module.exports = passport;