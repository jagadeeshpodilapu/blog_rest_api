const { use } = require("../app");
const { Users } = require("../models");

const hashPassword = require("../utils/hashpassword");
const comparePassword = require("../utils/comparePassword");

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

        res.status(201).json({ code: 201, status: true, message: "User registered successfully" });

    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        console.log(user);

        if (!user) {
            res.code = 401;
            throw new Error("Invalid credentials");
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid user"
            });
        }

        res.status(200).json({
            code: 200,
            status: true,
            message: "valid user"
        });




    } catch (error) {
        next(error);
    }

};
module.exports = { signup, signin };