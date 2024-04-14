const { Users } = require("../models");

const hashPassword = require("../utils/hashpassword");

const signup = async (req, res, next) => {
    try {

        const { name, email, password, role } = req.body;

        const isEmailExist = await Users.findOne({ email });

        if (isEmailExist) {
            res.code = 400;
            throw new Error("Email is already exist");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new Users({ name, email, password: hashedPassword, role });

        await newUser.save();

        res.status(201).json({code:201,status:true, message: "User registered successfully" });

    } catch (error) {
        next(error);
    }
};

module.exports = { signup };