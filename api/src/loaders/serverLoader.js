const express = require('express');
const env = require('../config/env');
const morgan = require('morgan');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const errorHandler = require('../../utils/errorHandler');
const cors = require('cors');

const sequelize = require('./dbLoader');
const seedDatabase = require('../database/seeder/seeder');
const Account = require('../database/models/Account');
const Package = require('../database/models/Package');
const Facility = require('../database/models/Facility');
const StatusType = require('../database/models/StatusType');
const PaymentOption = require('../database/models/PaymentOption');
const DocumentType = require('../database/models/DocumentType');
const ContentType = require('../database/models/ContentType');
const Order = require('../database/models/Order');
const Cart = require('../database/models/Cart');
const router = require('../routes/index');

const loadServer = async () => {

  const app = express();

  app.use(cors({
    origin: true,
    credentials: true
  }));

  app.use(express.json());

  app.use(cookieParser());

  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  try {
    await sequelize.authenticate();
    console.log(chalk.yellow.inverse('Database connection successsfull'));
    
    // Database associations
    DocumentType.hasMany(Account);
    Account.belongsTo(DocumentType);

    PaymentOption.hasMany(Account);
    Account.belongsTo(PaymentOption);

    Facility.hasMany(Account);
    Account.belongsTo(Facility);

    Account.hasMany(Package);
    Package.belongsTo(Account);

    StatusType.hasMany(Package);
    Package.belongsTo(StatusType);

    ContentType.hasMany(Package);
    Package.belongsTo(ContentType);

    Account.hasMany(Order);
    Order.belongsTo(Account);
    
    Order.belongsToMany(Package, { through: Cart });
    Package.belongsToMany(Order, { through: Cart });

    await sequelize.sync({ force: true });

    seedDatabase();
    
    // Router setup
    app.use(router);
    
    app.use((error, req, res, next) => {
      errorHandler.handleError(error, res);
    });
    
    const port = env.PORT;
    app.listen(port, () => {
      console.log(chalk.green(`Server running in ${env.NODE_ENV} environment`));
      console.log(chalk.blue.inverse(`Server running on port ${port}`));
    });
    
  } catch (error) {
    console.log(chalk.red.inverse('Database connection failed',  error));
  }
};

module.exports = loadServer;
