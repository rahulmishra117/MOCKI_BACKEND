// require mongoose 
const mongoose = require('mongoose');

// User SCHEMA
const userSchema = mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    report: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report' 
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;