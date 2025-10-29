const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Setting = sequelize.define(
    'Setting',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      description: {
        type: DataTypes.STRING,
      },
      group: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'settings',
    }
  );

  return Setting;
};
