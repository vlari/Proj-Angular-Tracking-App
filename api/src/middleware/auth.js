const Account = require('../database/models/Account');
const baseController = require('../controllers/baseController');
const env = require('../config/env');

const jwt = require('jsonwebtoken');

const { sendErrorResponse } = baseController;

exports.guard = async (req, res, next) => {
  let userToken = '';

  if (req.cookies.userToken) {
    userToken = req.cookies.userToken;
  }

  if (!userToken) {
    return next(sendErrorResponse(401));
  }

  try {
    const token = jwt.verify(userToken, env.SECRET_KEY);

    const user = await Account.findByPk(token.id);

    if (!user) {
      return next(sendErrorResponse(401));  
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    return next(sendErrorResponse(401));
  }
};
