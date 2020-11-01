const express = require('express');
const packageController = require('../controllers/packageController');
const router = express.Router();
const auth = require('../middleware/auth');

router.route('/packages').get(auth.guard, packageController.getPackages);
router.route('/packages/pending').get(auth.guard, packageController.getPendingPackages);
router.route('/packages').post(auth.guard, packageController.addPackage);

module.exports = router;
