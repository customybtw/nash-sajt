import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import ImageAsset from './ImageAsset.js';

class PageSection extends Model {}

PageSection.init(
  {
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
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'content',
    },
    metaTitle: {
      type: DataTypes.STRING,
    },
    metaDescription: {
      type: DataTypes.TEXT,
    },
    metaKeywords: {
      type: DataTypes.STRING,
    },
    schemaMarkup: {
      type: DataTypes.TEXT('long'),
    },
    extras: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: 'PageSection',
    tableName: 'page_sections',
  }
);

ImageAsset?.hasMany(PageSection, { foreignKey: 'imageId' });
PageSection.belongsTo(ImageAsset, { foreignKey: 'imageId' });

PageSection.hasMany(PageSection, { foreignKey: 'parentId', as: 'children' });
PageSection.belongsTo(PageSection, { foreignKey: 'parentId', as: 'parent' });

export default PageSection;
