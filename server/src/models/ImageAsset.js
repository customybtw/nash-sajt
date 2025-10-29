const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ImageAsset = sequelize.define(
    'ImageAsset',
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
      description: {
        type: DataTypes.TEXT,
      },
      altText: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seoTitle: {
        type: DataTypes.STRING,
      },
      seoDescription: {
        type: DataTypes.STRING(500),
      },
      tags: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      focalPoint: {
        type: DataTypes.JSON,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'image_assets',
    }
  );

  return ImageAsset;
};
