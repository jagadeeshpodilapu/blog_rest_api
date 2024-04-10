const { Users } = require("../models");

const signup = async (req, res, next) => {
    try {

        const { name, email, password, role } = req.body;

        const newUser = new Users({ name, email, password, role });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        next(error);
    }
};

module.exports = { signup };