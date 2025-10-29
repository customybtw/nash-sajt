const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  customerPhone: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'fulfilled', 'cancelled', 'refunded'),
    defaultValue: 'pending'
  },
  subtotal: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  notes: {
    type: DataTypes.TEXT
  },
  paymentProvider: {
    type: DataTypes.STRING
  },
  paymentReference: {
    type: DataTypes.STRING
  }
});

module.exports = Order;
