const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PricingPlan = sequelize.define(
    'PricingPlan',
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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'EUR',
      },
      billingCycle: {
        type: DataTypes.ENUM('monthly', 'yearly', 'one-time', 'commission'),
        defaultValue: 'monthly',
      },
      description: {
        type: DataTypes.TEXT,
      },
      features: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      seoTitle: {
        type: DataTypes.STRING,
      },
      seoDescription: {
        type: DataTypes.STRING(500),
      },
      isPopular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      metadata: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'pricing_plans',
    }
  );

  return PricingPlan;
};
