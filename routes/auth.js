const express = require('express');

const router = express.Router();

const { authController } = require('../controller');

const { signupValidator, signInValidator, emailValidator } = require("../validators/auth");
const validator = require("../validators/validator");

router.post('/signup', signupValidator, validator, authController.signup);
router.post('/signin', signInValidator, validator, authController.signin);
router.post('/send-verification-code', emailValidator, validator, authController.verifyCode);

module.exports = router;