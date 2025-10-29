const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CareerPosition = sequelize.define(
    'CareerPosition',
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
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employmentType: {
        type: DataTypes.ENUM('full_time', 'part_time', 'contract', 'freelance', 'internship'),
        defaultValue: 'full_time',
      },
      description: {
        type: DataTypes.TEXT('long'),
      },
      responsibilities: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      requirements: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      salaryRange: {
        type: DataTypes.STRING,
      },
      metaTitle: {
        type: DataTypes.STRING,
      },
      metaDescription: {
        type: DataTypes.STRING(500),
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      applicationEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'career_positions',
    }
  );

  return CareerPosition;
};
