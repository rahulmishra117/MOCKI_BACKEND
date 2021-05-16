const mongoose = require('mongoose');

// DOCTOR SCHEMA
const interviwerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
}, {
    timestamps: true
});

const INTERVIWER = mongoose.model('INTERVIWER', interviwerSchema);

module.exports = INTERVIWER;