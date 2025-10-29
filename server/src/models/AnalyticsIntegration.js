const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AnalyticsIntegration = sequelize.define(
    'AnalyticsIntegration',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trackingId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      metadata: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'analytics_integrations',
    }
  );

  return AnalyticsIntegration;
};
