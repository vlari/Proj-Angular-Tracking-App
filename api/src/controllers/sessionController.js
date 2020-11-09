const Account = require('../database/models/Account');
const Package = require('../database/models/Package');

const baseController = require('./baseController');
const authValidator = require('../../utils/requestValidators/authValidator');
const env = require('../config/env');
const mailService = require('../../utils/mail/mailService');
const packages = require('../database/seeder/data/packages.json');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');

const { sendJsonResponse, sendErrorResponse } = baseController;

exports.signUp = async (req, res, next) => {
  try {
    const validationResult = authValidator.validateSignup(req.body);

    if (validationResult.error) {
      return next(
        sendErrorResponse(400, validationResult.error.details[0].message)
      );
    }

    const isRegistered = await Account.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (isRegistered) {
      return next(sendErrorResponse(400, 'Account already registered'));
    }

    const registeredAccounts = await Account.count();
    const account = req.body;

    const salt = await bcrypt.genSalt(10);

    account.password = await bcrypt.hash(account.password, salt);
    account.code = `A${registeredAccounts + 1}`;
    account.isActive = true;

    const newAccount = await Account.create(account);

    /* Fetch packages when user created
    to simulate that account already
    purchased some packages. */
    packages.forEach((p) => {
      p.AccountId = newAccount.dataValues.id;
      p.trackingNumber = uuidv4();
    });

    await Package.bulkCreate(packages);

    const token = jwt.sign({ id: newAccount.dataValues.id }, env.SECRET_KEY, {
      expiresIn: '1h',
    });

    // With this approach the user
    // would be logged in once the
    // new account is created.
    // sendCookie(201, token, res);

    sendJsonResponse(201, { message: 'Account created successfully' }, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const validationResult = authValidator.validateSignin(req.body);

    if (validationResult.error) {
      return next(
        sendErrorResponse(400, validationResult.error.details[0].message)
      );
    }

    const { email, password } = req.body;

    const account = await Account.findOne({
      where: {
        email: email,
      },
    });

    if (!account) {
      return next(sendErrorResponse(401, 'Invalid user account'));
    }

    const isValidPassword = await bcrypt.compare(
      password,
      account.dataValues.password
    );

    if (!isValidPassword) {
      return next(sendErrorResponse(401, 'Invalid user account'));
    }

    const token = jwt.sign({ id: account.dataValues.id }, env.SECRET_KEY, {
      expiresIn: '1h',
    });

    sendCookie(200, token, res);
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const validationResult = authValidator.validateEmail(req.body);

    if (validationResult.error) {
      return next(
        sendErrorResponse(400, validationResult.error.details[0].message)
      );
    }

    const email = req.body.email;

    const account = await Account.findOne({
      where: {
        email: email,
      },
    });

    if (!account) {
      return next(sendErrorResponse(401, 'Invalid user account'));
    }

    const { id, password, createdAt } = account.dataValues;

    const payload = {
      id,
      email,
    };

    const secretKey = crypto
      .createHash('SHA256')
      .update(`${password}-${createdAt}`)
      .digest('hex');

    const token = jwt.sign(payload, secretKey);

    // In production would be the real Url.
    const resetUrl = `${req.protocol}://localhost:4200/passwordreset/${id}/${token}`;

    const emailOptions = {
      type: 'forgotPassword',
      email,
      resetUrl,
    };

    const emailSettings = mailService.getEmailSettings(emailOptions);
    const transporter = mailService.getTransporter();

    transporter.verify((error, success) => {
      if (error) {
        return next(sendErrorResponse(500, `SMTP connection error. ${error}`));
      } else {
        console.log(chalk.green.inverse('SMTP connection ready'));
      }
    });

    transporter.sendMail(emailSettings, (error, info) => {
      if (error) {
        return next(sendErrorResponse(500));
      } else {
        sendJsonResponse(
          200,
          { message: 'Email sent', data: info.response },
          res
        );
      }
    });
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { id, token, requestedPassword } = req.body;

    const account = await Account.findOne({
      where: {
        id: id,
      },
    });

    if (!account) {
      return next(sendErrorResponse(401, 'Invalid user account'));
    }

    const { password, createdAt } = account;

    const secretKey = await crypto
      .createHash('SHA256')
      .update(`${password}-${createdAt}`)
      .digest('hex');

    const userToken = jwt.verify(token, secretKey);

    if (userToken.id === id) {
      const salt = await bcrypt.genSalt(10);
      account.password = await bcrypt.hash(requestedPassword, salt);

      await account.save();
      sendJsonResponse(200, { message: 'Password updated' }, res);
    } else {
      return next(sendErrorResponse(500));
    }
  } catch (error) {
    next(sendErrorResponse(500, error));
  }
};

const sendCookie = (statusCode, token, res) => {
  res
    .status(statusCode)
    .cookie('userToken', token, {
      expire: new Date() + 360000,
      httpOnly: true,
    })
    .json({ userToken: token });
};
