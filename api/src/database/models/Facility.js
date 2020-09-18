const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');

const Facility = sequelize.define('Facility', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Facility;
