const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');

const Package = sequelize.define('Package', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Package;
