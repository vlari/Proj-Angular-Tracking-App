const Order = require('../database/models/Order');
const Package = require('../database/models/Package');
const baseController = require('./baseController');
const orderValidator = require('../../utils/requestValidators/orderValidator');
const PaymentOption = require('../database/models/PaymentOption');

const { Op } = require('sequelize');

const { sendJsonResponse, sendErrorResponse } = baseController;

exports.getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startPage = (page - 1) * limit;
    const endPage = page * limit;

    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date().getDate() - 14;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

    const orders = await Order.findAndCountAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: {
        model: Package,
        required: true,
      },
      offset: startPage,
      limit: limit,
    });

    const pagination = {};

    if (endPage < orders.count) {
      pagination.nextPage = {
        page: page + 1,
        limit,
      };
    }

    if (startPage > 0) {
      pagination.previousPage = {
        page: page - 1,
        limit,
      };
    }

    sendJsonResponse(
      200,
      { data: orders.rows, count: orders.count, pagination },
      res
    );
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

    const paymentOption = await PaymentOption.findByPk(
      req.user.dataValues.PaymentOptionId
    );

    const orders = await Order.count();
    const orderNumber = orders || 0;

    const order = {};
    order.AccountId = req.user.dataValues.id;
    (order.orderNumber = `ON-${orderNumber + 1}`),
      (order.date = new Date(Date.now()));
    order.paymentOption = paymentOption.dataValues.name;
    order.subtotal = req.body.subtotal;
    order.salesTax = req.body.salesTax;
    order.total = req.body.total;

    const registeredOrder = await Order.create(order);

    const packages = await Package.findAll({
      where: {
        trackingNumber: req.body.packages,
      },
    });

    await registeredOrder.addPackages(packages);

    await Package.update(
      {
        StatusTypeId: 4,
      },
      {
        where: {
          trackingNumber: {
            [Op.or]: [req.body.packages],
          },
        },
      }
    );

    sendJsonResponse(201, { data: registeredOrder }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
