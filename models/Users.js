const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },

    //role 1 - super Admin ,2 - Normal Admin, 3- User
    role: { type: Number, default: 3 },
    verificationCode: String,
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const Users = mongoose.model('user', userSchema);

module.exports = Users;