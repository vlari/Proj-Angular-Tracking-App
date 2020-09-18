const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();
const auth = require('../middleware/auth');

router.route('/orders').get(auth.guard, orderController.getOrders);
router.route('/orders').post(auth.guard, orderController.addOrder);

module.exports = router;
