const { DataTypes } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize) => {
  const PortfolioItem = sequelize.define(
    'PortfolioItem',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
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
      category: {
        type: DataTypes.STRING,
      },
      heroImage: {
        type: DataTypes.STRING,
      },
      gallery: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      metaTitle: {
        type: DataTypes.STRING,
      },
      metaDescription: {
        type: DataTypes.STRING(500),
      },
      seoKeywords: {
        type: DataTypes.STRING,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'portfolio_items',
      hooks: {
        beforeValidate: (item) => {
          if (!item.slug && item.title) {
            item.slug = slugify(item.title, { lower: true, strict: true });
          }
        },
      },
    }
  );

  return PortfolioItem;
};
