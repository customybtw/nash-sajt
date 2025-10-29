const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CustomFeature = sequelize.define(
    'CustomFeature',
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
      description: {
        type: DataTypes.TEXT,
      },
      configuration: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      planLevel: {
        type: DataTypes.ENUM('basic', 'full', 'premium'),
        defaultValue: 'premium',
      },
    },
    {
      tableName: 'custom_features',
    }
  );

  return CustomFeature;
};
