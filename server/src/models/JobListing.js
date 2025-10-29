import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class JobListing extends Model {}

JobListing.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
    },
    employmentType: {
      type: DataTypes.STRING,
    },
    salaryRange: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT('long'),
    },
    requirements: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    responsibilities: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    seo: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'JobListing',
    tableName: 'job_listings',
  }
);

export default JobListing;
