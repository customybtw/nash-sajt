import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class DomainRecord extends Model {}

DomainRecord.init(
  {
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrar: {
      type: DataTypes.STRING,
    },
    renewalDate: {
      type: DataTypes.DATE,
    },
    hostingProvider: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    dns: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'DomainRecord',
    tableName: 'domain_records',
  }
);

export default DomainRecord;
