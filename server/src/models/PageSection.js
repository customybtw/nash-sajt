const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PageSection = sequelize.define(
    'PageSection',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      page: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT('long'),
      },
      layout: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
      metaTitle: {
        type: DataTypes.STRING,
      },
      metaDescription: {
        type: DataTypes.STRING(500),
      },
      metaKeywords: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'page_sections',
      indexes: [
        {
          unique: true,
          fields: ['page', 'slug'],
        },
      ],
    }
  );

  return PageSection;
};
