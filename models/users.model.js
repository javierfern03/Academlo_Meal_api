const { db } = require('../database/config');
const { DataTypes } = require('sequelize');

const User = db.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'desabled'),
    defaultValue: 'active',
  },
  role: {
    type: DataTypes.ENUM('normal', 'admin'),
    defaultValue: 'normal',
  },
});

module.exports = User;
