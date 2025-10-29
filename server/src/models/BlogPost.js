const { DataTypes } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize) => {
  const BlogPost = sequelize.define(
    'BlogPost',
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
      excerpt: {
        type: DataTypes.STRING(500),
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      coverImage: {
        type: DataTypes.STRING,
      },
      metaTitle: {
        type: DataTypes.STRING,
      },
      metaDescription: {
        type: DataTypes.STRING(500),
      },
      publishedAt: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM('draft', 'scheduled', 'published'),
        defaultValue: 'draft',
      },
    },
    {
      tableName: 'blog_posts',
      hooks: {
        beforeValidate: (post) => {
          if (!post.slug && post.title) {
            post.slug = slugify(post.title, { lower: true, strict: true });
          }
        },
      },
    }
  );

  return BlogPost;
};
