const Account = require('../database/models/Account');
const DocumentType = require('../database/models/DocumentType');
const PaymentOption = require('../database/models/PaymentOption');
const Facility = require('../database/models/Facility');

const baseController = require('./baseController');

const { sendJsonResponse, sendErrorResponse } = baseController;

exports.getAccountDetails = async (req, res, next) => {
  try {

    const account = await Account.findByPk(req.user.dataValues.id,{
      attributes: [
        'id',
        'code',
        'name',
        'lastName',
        'dateOfBirth',
        'citizenId',
        'email',
        'address',
        'phone',
      ],
      include: [{
        model: DocumentType,
        attributes: ['name']
      },
      {
        model: PaymentOption,
        attributes: ['name']
      },
      {
        model: Facility,
        attributes: ['address']
      }]
    });

    sendJsonResponse(200, { data: account }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    const account = await Account.findByPk(req.user.dataValues.id);

    const updatedAccount = await account.update(req.body);

    sendJsonResponse(200, { data: updatedAccount }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};
