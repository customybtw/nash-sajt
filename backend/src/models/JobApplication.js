const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobApplication = sequelize.define('JobApplication', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  message: {
    type: DataTypes.TEXT
  },
  cvUrl: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('new', 'reviewed', 'contacted', 'rejected', 'hired'),
    defaultValue: 'new'
  }
});

module.exports = JobApplication;
