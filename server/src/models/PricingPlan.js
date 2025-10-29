import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class PricingPlan extends Model {}

PricingPlan.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    frequency: {
      type: DataTypes.STRING,
      defaultValue: 'monthly',
    },
    description: {
      type: DataTypes.TEXT,
    },
    features: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'PricingPlan',
    tableName: 'pricing_plans',
  }
);

export default PricingPlan;
