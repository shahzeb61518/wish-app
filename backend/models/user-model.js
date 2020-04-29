const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joinDate: { type: Date },
    dob: { type: String },
    education: { type: String },
    job: { type: String },
    address: { type: String },
    image: { type: String },

});

module.exports = mongoose.model('User', userSchema);
