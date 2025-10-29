const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderNumber: {
        type: DataTypes.STRING,
        unique: true,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'EUR',
      },
      status: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded'),
        defaultValue: 'pending',
      },
      paymentMethod: {
        type: DataTypes.ENUM('stripe', 'paypal', 'bank_transfer', 'cash'),
        defaultValue: 'stripe',
      },
      paymentStatus: {
        type: DataTypes.ENUM('unpaid', 'paid', 'refunded'),
        defaultValue: 'unpaid',
      },
      items: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      metadata: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'orders',
      hooks: {
        beforeCreate: (order) => {
          if (!order.orderNumber) {
            order.orderNumber = `ORD-${uuidv4().split('-')[0].toUpperCase()}`;
          }
        },
      },
    }
  );

  return Order;
};
