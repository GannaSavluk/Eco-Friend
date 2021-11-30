const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1 }, // 0 - admin, 1-user
    favorite: {type: Array}, // ??
    date: { type: Date, default: new Date() },
});

module.exports = mongoose.model('User', UserSchema);