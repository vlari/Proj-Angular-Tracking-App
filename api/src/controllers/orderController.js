const Order = require('../database/models/Order');
const Package = require('../database/models/Package');
const baseController = require('./baseController');
const orderValidator = require('../../utils/requestValidators/orderValidator');
const PaymentOption = require('../database/models/PaymentOption');

const { sendJsonResponse, sendErrorResponse } = baseController;

exports.getOrders = (req, res, next) => {
  try {
    
  } catch (error) {
   next(sendErrorResponse(500)); 
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const validationResult = orderValidator.validateOrder(req.body);

    if (validationResult.error) {
      return next(
        sendErrorResponse(400, validationResult.error.details[0].message)
      );
    }

    const paymentOption = await PaymentOption.findByPk(req.user.dataValues.PaymentOptionId);

    const order = {};
    order.AccountId = req.user.dataValues.id;
    order.orderNumber = '12',
    order.date = '2020-06-06';
    order.paymentOption = paymentOption.dataValues.name;
    order.subtotal = req.body.subtotal;
    order.salesTax = req.body.salesTax;
    order.total = req.body.total;

    const registeredOrder = await Order.create(order);

    const packages = await Package.findAll({
      where: {
        trackingNumber: req.body.packages
      }
    });

    res.json({ message: 'helloooo' });
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
