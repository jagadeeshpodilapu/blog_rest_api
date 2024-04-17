const { check } = require('express-validator');



const signupValidator = [

    check("name").notEmpty().withMessage("Name is required"),
    check('email').isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password should be 6 char").notEmpty().withMessage("Password is required")
];

const signInValidator = [
    check('email').isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password should be 6 char").notEmpty().withMessage("Password is required")
];

const emailValidator = [
    check('email').isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
];

const verifyUserValidator = [
    check('email').isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check('code').notEmpty().withMessage("code is not empty"),
];

const recoverPasswordValidator = [
    check('email').isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check('code').notEmpty().withMessage("code is not empty"),
    check("password").isLength({ min: 6 }).withMessage("Password should be 6 char").notEmpty().withMessage("Password is required")
];

module.exports = { signupValidator, signInValidator, emailValidator, verifyUserValidator, recoverPasswordValidator };