const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  paymentOption: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  salesTax: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
});

module.exports = Order;
