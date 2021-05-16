const INTERVIEWER = require('../../../models/interviewer');
const jwt = require('jsonwebtoken');
const { findOne } = require('../../../models/interviewer');

// create Interviewer in db and register
module.exports.createinterviwer = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('passwords did not match!');
        return res.json(422, {
            status: 422,
            message: 'passwords did not matched'
        });
    }

    try {

        let interviewer = await INTERVIEWER.findOne({ username: req.body.username });

        if (!interviewer) {
            let interviewer1 = await INTERVIEWER.create(req.body);
            console.log('Interviwer Registered Successfully!');
            return res.json(200, {
                status: 200,
                message: 'Interviwer Registered Successfully!',
                data:{
                    interviewer: {
                        _id: interviewer1.id,
                        name: interviewer1.name,
                        username: interviewer1.username
                    }
                }
                
            })
        } else {
            console.log('Interviewer already exists!')
            return res.json(409, {
                status: 409,
                message: 'Interviewer already exists!',
                data: {
                    interviewer: {
                        _id: interviewer.id,
                        name: interviewer.name,
                        username: interviewer.username
                    }
                }
            })
        }

    } catch (err) {
        console.log('Error', err);
        return res.json(500, {
            status: 500,
            message: 'Internal Server Error'
        })
    }

}

// loging in Interviewer and creating token for him
module.exports.logininterviewer = async function(req, res) {

    try {
        let interviewer = await INTERVIEWER.findOne({ username: req.body.username });

        if (!interviewer || interviewer.password != req.body.password) {
            return res.json(422, {
                message: 'Invalid username or password'
            });
        }
        
        return res.json(200, {
            message: 'Login Successful and here is your token',
            data: {
                jwtToken: jwt.sign(interviewer.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: '200000' })
            } 
        });

    } catch (err) {
        console.log('Error', err);
        return res.json(500, {
            status: 500,
            message: "Internal Server Error"
        });
    }

}