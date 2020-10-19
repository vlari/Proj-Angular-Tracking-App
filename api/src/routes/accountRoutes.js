const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();
const auth = require('../middleware/auth');

router.route('/accounts').get(auth.guard, accountController.getAccountDetails);
router.route('/accounts').put(auth.guard, accountController.updateAccount);
router.route('/accounts/password').put(auth.guard, accountController.updatePassword);

module.exports = router;
