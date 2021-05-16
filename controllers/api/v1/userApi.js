// require User model
const User = require('../../../models/user');
// require report model
const Report = require('../../../models/report');

// status only within this array
let arrayStatus = ['Pass', 'Fail', 'NotAttempt'];

// Registering the User using phone number and name
module.exports.registeruser = async function (req, res) {

    try {

        let user = await User.findOne({ phoneNumber: req.body.phoneNumber });

        if (!user) {
            let user1 = await User.create(req.body);
            console.log('User Registered Successfully!');
            return res.json(200, {
                status: 200,
                message: 'User Registered Successfully, and phoneNumber is his/her unique id',
                data: {
                    user: {
                        _id: user1.id,
                        name: user1.name,
                        phoneNumber: user1.phoneNumber
                    }
                }
            })
        } else {
            console.log('User already exists!')
            return res.json(409, {
                status: 409,
                message: 'User already exists!',
                data: {
                    user: {
                        _id: user.id,
                        name: user.name,
                        phoneNumber: user.phoneNumber
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

// creating User report 
module.exports.createuserReport = async function (req, res) {
    try {
        let user = await User.findOne({ phoneNumber: req.params.id });
        if (user) {
            let flag = false;
            for (let i = 0; i < arrayStatus.length; i++) {
                if (arrayStatus[i] === req.body.status)
                    flag = true;
            }
            if (flag) {
                let report = await Report.create({
                    status: req.body.status,
                    user: user._id,
                    interviewer: req.User._id
                });
                user.report.push(report);
                user.save();

                report = await report.populate('interviewer', 'username name -_id').execPopulate();
                report = await report.populate('user', 'name phoneNumber -_id').execPopulate();
                return res.json(200, {
                    status: 200,
                    message: 'Report Created Successfully!',
                    data: {
                        report: report
                    }
                })
            } else {
                return res.json(500, {
                    status: 500,
                    message: 'Enter correct status!'
                })
            }
        } else {
            return res.json(404, {
                status: 404,
                message: 'user not exist!'
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

// generating all reports of a user
module.exports.allReports = async function (req, res) {
    try {
        let user = await User.findOne({ phoneNumber: req.params.id });
        if (user) {
            let reports = await Report.find({ user: user._id }, 'status interviewer date -_id')
                .sort('createdAt')
                .populate('interviewer', 'username name -_id')
                

            return res.json(200, {
                status: 200,
                message: 'All reports are here',
                userName: user.name,
                phoneNumber: user.phoneNumber,
                data: {
                    reports: reports
                }
            })

        } else {
            return res.json(404, {
                status: 404,
                message: 'user not exist!'
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