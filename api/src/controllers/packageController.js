const Package = require('../database/models/Package');
const StatusType = require('../database/models/StatusType');
const baseController = require('./baseController');
const packageValidator = require('../../utils/requestValidators/packageValidator');

const { Op } = require('sequelize');

const { sendJsonResponse, sendErrorResponse } = baseController;

exports.getPackages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startPage = (page - 1) * limit;
    const endPage = page * limit;

    const statusQuery = req.query.status || {
      [Op.not]: 'Delivered',
    };

    const includeQuery = {
      include: {
        model: StatusType,
        required: true,
        where: {
          name: statusQuery,
        },
      },
    };

    const packageQuery = Object.assign(
      {
        AccountId: req.user.dataValues.id,
      },
      req.query.trackingNumber
      ? { trackingNumber: req.query.trackingNumber }
      : {}
    );

    const packages = await Package.findAndCountAll({
      where: packageQuery,
      ...includeQuery,
      offset: startPage,
      limit: limit
    });

    const pagination = {};

    if (endPage < packages.count) {
      pagination.nextPage = {
        page: page + 1,
        limit
      };
    }

    if (startPage > 0) {
      pagination.previousPage = {
        page: page - 1,
        limit
      };
    }

    sendJsonResponse(200, { data: packages.rows, count: packages.count, pagination }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};

exports.addPackage = async (req, res, next) => {
  try {
    const package = req.body;
    const validationResult = packageValidator.validatePackage(package);

    if (validationResult.error) {
      return next(
        sendErrorResponse(400, validationResult.error.details[0].message)
      );
    }

    package.weight = parseFloat(package.weight);
    package.date = new Date(Date.now());

    const newPackage = await Package.create(package);

    sendJsonResponse(201, { data: newPackage }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};
