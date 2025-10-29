const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PricingPlan = sequelize.define('PricingPlan', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  priceMonthly: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  billingType: {
    type: DataTypes.ENUM('monthly', 'yearly', 'commission', 'custom'),
    defaultValue: 'monthly'
  },
  description: {
    type: DataTypes.TEXT
  },
  features: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  highlight: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = PricingPlan;
