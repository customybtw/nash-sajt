const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PageSection = sequelize.define('PageSection', {
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.ENUM(
      'home',
      'about',
      'contact',
      'gallery',
      'pricing',
      'portfolio',
      'blog',
      'career',
      'terms',
      'privacy',
      'custom'
    ),
    allowNull: false,
    defaultValue: 'custom'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subtitle: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT('long')
  },
  seoTitle: {
    type: DataTypes.STRING
  },
  seoDescription: {
    type: DataTypes.STRING(500)
  },
  seoKeywords: {
    type: DataTypes.STRING
  },
  heroImageUrl: {
    type: DataTypes.STRING
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  extraData: {
    type: DataTypes.JSON
  }
});

module.exports = PageSection;
