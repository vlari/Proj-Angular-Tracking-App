const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();
const auth = require('../middleware/auth');

router.route('/accounts').get(auth.guard, accountController.getAccountDetails);
router.route('/accounts').put(auth.guard, accountController.updateAccount);

module.exports = router;
