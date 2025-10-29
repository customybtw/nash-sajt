const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobListing = sequelize.define('JobListing', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  employmentType: {
    type: DataTypes.ENUM('full_time', 'part_time', 'contract', 'internship'),
    defaultValue: 'full_time'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.TEXT
  },
  benefits: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = JobListing;
