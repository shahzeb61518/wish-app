const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    joinDate: { type: Date },
    dateofbirth: { type: Date },
    phone: { type: String },
    education: { type: String },
    address: { type: String },
    currentAddress: { type: String },
    userViews: { type: String },
    userJob: { type: String },
    profileImage: { type: String },

});

module.exports = mongoose.model('User', userSchema);
