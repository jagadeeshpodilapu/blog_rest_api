const { use } = require("../app");
const { Users } = require("../models");

const hashPassword = require("../utils/hashpassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require('../utils/generateToken');
const generateCode = require('../utils/generateCode');

const sendMail = require("../utils/send_email");

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

        const token = generateToken(user);

        res.status(200).json({
            code: 200,
            status: true,
            message: "User signin successfull",
            data: {
                'token': token
            }
        });




    } catch (error) {
        next(error);
    }

};

const verifyCode = async (req, res, next) => {

    try {
        const { email } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("User not found");
        }

        if (user.isVerified) {
            res.code = 400;
            throw new Error("User already verified");
        }

        const code = generateCode(6);

        user.verificationCode = code;

        await user.save();

        //send email verification code
        await sendMail({
            emailTo: user.email,
            subject: "Email verification code",
            code, content: "Verify your account"

        });


        res.status(200).json({ code: 200, status: true, message: 'email sent successfully' });


    } catch (error) {

        next(error);

    }
};


const verifyUser = async (req, res, next) => {
    try {

        const { email, code } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("User not found");
        }

        if (user.verificationCode !== code) {
            res.code = 400;
            throw new Error("Invalid code");
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({
            code: 200,
            status: true,
            message: "User verified code successfully"


        })


    } catch (error) {

        next(error);

    }
};


const forgotpasswordCode = async (req, res, next) => {
    try {



        const { email } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("User not found");
        }

        const code = generateCode(6);

        user.forgotpasswordCode = code;

        await user.save();

        await sendMail({
            emailTo: user.email,
            subject: "Forgot Password  code",
            code, content: "Change your password"

        });

        res.status(200).json({
            code: 200,
            status: true,
            message: "Forgot password code sent successfully"
        });





    } catch (error) {
        next(error);
    }
}

const recoverPassword = async (req, res, next) => {

    try {
        const { email, code, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            res.code = 404;
            throw new Error("User not found");
        }

        if (user.forgotpasswordCode !== code) {
            res.code = 400;
            throw new Error("Invalid code");
        }
        const hashedPassword=await hashPassword(password);
        user.password = hashedPassword;
        user.forgotpasswordCode = null;
        await user.save();

        res.status(200).json({
         code:200,
         status:true,
         message:"User password updated successfully"
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { signup, signin, verifyCode, verifyUser, forgotpasswordCode, recoverPassword };