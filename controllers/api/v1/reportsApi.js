// require report model
const Report = require('../../../models/report');

// status only within this array
let arrayStatus = ['Pass','Fail','NotAttempt'];

// get all reports of specific status
module.exports.statusReports = async function (req, res) {
    try {
        let status = req.params.status;
        let flag = false;
        for (let i = 0; i < arrayStatus.length; i++) {
            if (arrayStatus[i] === status)
                flag = true;
        }

        if(flag) {
            let reports = await Report.find({status: status}, 'status user interviewer date -_id')
            .populate('user', 'name phoneNumber -_id')
            .populate('interviewer', 'name -_id')
             
            return res.json(200, {
                status: 200,
                message: 'Reports of this status are:',
                reports: reports
            });
        } else {
            return res.json(500, { 
                status: 500,
                message: 'Enter correct status!'
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