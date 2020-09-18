const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');

const Account = sequelize.define('Account', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  citizenId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Account;
