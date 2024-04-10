const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: false, minlength: 6 },

    //role 1 - super Admin ,2 - Normal Admin, 3- User
    role: { type: Number, default: 3 }
}, { timestamps: true });

const Users = mongoose.model('user', userSchema);

module.exports = Users;