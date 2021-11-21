const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, index: { unique: true } },
    emailID: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    DOB: { type: Date, required: true },
    currentCity: { type: String },
    state: { type: String }
});

module.exports = mongoose.model('User', userSchema, 'users');