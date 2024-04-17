const express = require('express');

const router = express.Router();

const { authController } = require('../controller');

const { signupValidator, signInValidator, emailValidator,verifyUserValidator } = require("../validators/auth");
const validator = require("../validators/validator");

router.post('/signup', signupValidator, validator, authController.signup);
router.post('/signin', signInValidator, validator, authController.signin);
router.post('/send-verification-code', emailValidator, validator, authController.verifyCode);
router.post('/verify-user', verifyUserValidator,validator, authController.verifyUser);
router.post('/forgot-password-code', emailValidator,validator, authController.forgotpasswordCode);
router.post('/recover-password', emailValidator,validator, authController.recoverPassword);

module.exports = router;