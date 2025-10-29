const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ContactMessage = sequelize.define(
    'ContactMessage',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
      message: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('new', 'in_progress', 'resolved'),
        defaultValue: 'new',
      },
      metadata: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      respondedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'contact_messages',
    }
  );

  return ContactMessage;
};
