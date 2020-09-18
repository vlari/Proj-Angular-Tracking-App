const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');
const Order = require('./Order');
const Package = require('./Package');

const Cart = sequelize.define('Cart', {
  OrderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id'
    }
  },
  PackageId: {
    type: DataTypes.INTEGER,
    references: {
      model: Package,
      key: 'id'
    }
  }
});

module.exports = Cart;
