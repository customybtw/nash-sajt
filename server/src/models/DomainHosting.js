const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DomainHosting = sequelize.define(
    'DomainHosting',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      planDetails: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      notes: {
        type: DataTypes.TEXT,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'domain_hosting',
    }
  );

  return DomainHosting;
};
