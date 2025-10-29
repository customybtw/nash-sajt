import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';

class Order extends Model {}

Order.init(
  {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    total: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    paymentProvider: {
      type: DataTypes.STRING,
    },
    paymentReference: {
      type: DataTypes.STRING,
    },
    shippingAddress: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
  }
);

class OrderItem extends Model {}

OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
  }
);

Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { Order, OrderItem };
