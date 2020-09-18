const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

const { signUp, signIn, forgotPassword, resetPassword } = sessionController;

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/passwordforgot').post(forgotPassword);
router.route('/passwordreset').post(resetPassword);

module.exports = router;
