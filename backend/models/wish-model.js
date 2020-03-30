const mongoose = require('mongoose');

const wishSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoLink: { type: String },
});

module.exports = mongoose.model('Wish', wishSchema);
