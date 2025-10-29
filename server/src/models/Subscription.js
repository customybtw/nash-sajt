const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'paused', 'cancelled'),
        defaultValue: 'active',
      },
      startedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      expiresAt: {
        type: DataTypes.DATE,
      },
      customizations: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'subscriptions',
    }
  );

  return Subscription;
};
