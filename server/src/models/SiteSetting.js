import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class SiteSetting extends Model {}

SiteSetting.init(
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'SiteSetting',
    tableName: 'site_settings',
  }
);

export default SiteSetting;
