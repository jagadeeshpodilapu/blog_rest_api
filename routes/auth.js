const express = require('express');

const router = express.Router();

const { authController } = require('../controller');

const {signupValidator}=require("../validators/auth");
const validator=require("../validators/validator");

router.post('/signup',signupValidator,validator,authController.signup);


module.exports = router;