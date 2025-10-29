const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GalleryImage = sequelize.define('GalleryImage', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500)
  },
  altText: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seoTitle: {
    type: DataTypes.STRING
  },
  seoDescription: {
    type: DataTypes.STRING(500)
  },
  tags: {
    type: DataTypes.STRING
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = GalleryImage;
