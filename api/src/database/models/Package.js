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
  length: {
    type: DataTypes.STRING,
    allowNull: false
  },
  width: {
    type: DataTypes.STRING,
    allowNull: false
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Package;
