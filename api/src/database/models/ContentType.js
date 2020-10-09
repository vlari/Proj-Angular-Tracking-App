const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');

const ContentType = sequelize.define('ContentType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Misc'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Misc'
  }
}, {
  timestamps: false
});

module.exports = ContentType;
