import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class ContactMessage extends Model {}

ContactMessage.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new',
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'ContactMessage',
    tableName: 'contact_messages',
  }
);

export default ContactMessage;
