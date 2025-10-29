import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import ImageAsset from './ImageAsset.js';
import User from './User.js';

class BlogPost extends Model {}

BlogPost.init(
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
    excerpt: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'draft',
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
    seo: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'BlogPost',
    tableName: 'blog_posts',
  }
);

BlogPost.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(BlogPost, { foreignKey: 'authorId', as: 'posts' });

BlogPost.belongsTo(ImageAsset, { foreignKey: 'heroImageId', as: 'heroImage' });
ImageAsset.hasMany(BlogPost, { foreignKey: 'heroImageId' });

export default BlogPost;
