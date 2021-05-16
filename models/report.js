const mongoose = require('mongoose');

// Reports SCHEMA
const reportSchema = mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    interviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'INTERVIEWER',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;