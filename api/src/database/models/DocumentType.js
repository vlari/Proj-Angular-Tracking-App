const { DataTypes } = require('sequelize');
const sequelize = require('../../loaders/dbLoader');

const DocumentType = sequelize.define('DocumentType', {
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

module.exports = DocumentType;
