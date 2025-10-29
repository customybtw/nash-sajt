import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import ImageAsset from './ImageAsset.js';

class PortfolioItem extends Model {}

PortfolioItem.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT('long'),
    },
    link: {
      type: DataTypes.STRING,
    },
    seo: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'PortfolioItem',
    tableName: 'portfolio_items',
  }
);

PortfolioItem.belongsTo(ImageAsset, { foreignKey: 'coverImageId', as: 'coverImage' });
ImageAsset.hasMany(PortfolioItem, { foreignKey: 'coverImageId' });

export default PortfolioItem;
