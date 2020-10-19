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
        attributes: ['id', 'name']
      },
      {
        model: PaymentOption,
        attributes: ['id', 'name']
      },
      {
        model: Facility,
        attributes: ['id', 'address']
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

exports.updatePassword = async (req, res, next) => {
  try {
    const account = await Account.findByPk(req.user.dataValues.id);

    const { password, newPassword } = req.body;

    const isValidPassword = await bcrypt.compare(
      password,
      account.password
    );

    if (!isValidPassword) {
      return next(sendErrorResponse(401, 'Invalid user account'));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedAccount = await account.update({ password: hashedPassword });

    sendJsonResponse(200, { data: updatedAccount }, res);
  } catch (error) {
    next(sendErrorResponse(500));
  }
};
