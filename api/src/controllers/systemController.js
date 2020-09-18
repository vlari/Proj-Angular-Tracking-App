const ContentType = require('../database/models/ContentType');
const StatusType = require('../database/models/StatusType');
const PaymentOption = require('../database/models/PaymentOption');
const DocumentType = require('../database/models/DocumentType');
const Facility = require('../database/models/Facility');
const baseController = require('./baseController');

const { sendJsonResponse, sendErrorResponse } = baseController;

exports.getContentTypes = async (req, res, next) => {
  try {
    const contentTypes = await ContentType.findAll({
      order:[
        ['name']
      ]
    });

    sendJsonResponse(200, { data: contentTypes, count: contentTypes.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getStatusTypes = async (req, res, next) => {
  try {
    const statusTypes = await StatusType.findAll({
      order:[
        ['name']
      ]
    });

    sendJsonResponse(200, { data: statusTypes, count: statusTypes.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getPaymentOptions = async (req, res, next) => {
  try {
    const paymentOptions = await PaymentOption.findAll({
      order:[
        ['name']
      ]
    });

    sendJsonResponse(200, { data: paymentOptions, count: paymentOptions.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getDocumentTypes = async (req, res, next) => {
  try {
    const documentTypes = await DocumentType.findAll({
      order:[
        ['name']
      ]
    });

    sendJsonResponse(200, { data: documentTypes, count: documentTypes.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.findAll({
      order:[
        ['code']
      ]
    });

    sendJsonResponse(200, { data: facilities, count: facilities.length }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};
