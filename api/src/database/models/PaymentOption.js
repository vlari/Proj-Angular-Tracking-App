const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');

const PaymentOption = sequelize.define('PaymentOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = PaymentOption;
