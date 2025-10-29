const { DataTypes } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize) => {
  const Product = sequelize.define(
    'Product',
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
        unique: true,
      },
      description: {
        type: DataTypes.TEXT('long'),
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: 'EUR',
      },
      sku: {
        type: DataTypes.STRING,
        unique: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('draft', 'active', 'archived'),
        defaultValue: 'draft',
      },
      images: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      seoTitle: {
        type: DataTypes.STRING,
      },
      seoDescription: {
        type: DataTypes.STRING(500),
      },
      metadata: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'products',
      hooks: {
        beforeValidate: (product) => {
          if (!product.slug && product.name) {
            product.slug = slugify(product.name, { lower: true, strict: true });
          }
        },
      },
    }
  );

  return Product;
};
