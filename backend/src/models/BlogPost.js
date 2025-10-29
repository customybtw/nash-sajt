const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  excerpt: {
    type: DataTypes.STRING(500)
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  featuredImageUrl: {
    type: DataTypes.STRING
  },
  seoTitle: {
    type: DataTypes.STRING
  },
  seoDescription: {
    type: DataTypes.STRING(500)
  },
  publishedAt: {
    type: DataTypes.DATE
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = BlogPost;
