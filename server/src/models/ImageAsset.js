import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class ImageAsset extends Model {}

ImageAsset.init(
  {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
    },
    seoTitle: {
      type: DataTypes.STRING,
    },
    seoDescription: {
      type: DataTypes.TEXT,
    },
    width: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'ImageAsset',
    tableName: 'image_assets',
  }
);

export default ImageAsset;
