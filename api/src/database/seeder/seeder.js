const chalk = require('chalk');

const ContentType = require('../models/ContentType');
const StatusType = require('../models/StatusType');
const PaymentOption = require('../models/PaymentOption');
const DocumentType = require('../models/DocumentType');
const Facility = require('../models/Facility');
const Account = require('../models/Account');
const Package = require('../models/Package');

const contentTypes = require('./data/contentTypes.json');
const statusTypes = require('./data/statusTypes.json');
const paymentOptions = require('./data/paymentOptions.json');
const documentTypes = require('./data/documentTypes.json');
const facilities = require('./data/facilities.json');
const users = require('./data/users.json');
const packages = require('./data/packages.json');

const seedDatabase = async () => {

  try {
    // Insert content types
    await ContentType.bulkCreate(contentTypes);

    // Insert status types
    await StatusType.bulkCreate(statusTypes);

    // Insert payment option
    await PaymentOption.bulkCreate(paymentOptions);

    // Insert document types
    await DocumentType.bulkCreate(documentTypes);

    // Insert facilities
    await Facility.bulkCreate(facilities);

    // Insert users
    await Account.bulkCreate(users);

    // Insert packages for initial account
    await Package.bulkCreate(packages);

    console.log(chalk.yellow.inverse('Database seed ended'));
  } catch (error) {
    console.log(chalk.red.inverse('Error seeding the database', error));
  }

};

module.exports = seedDatabase;
