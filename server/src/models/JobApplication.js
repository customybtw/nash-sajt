const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JobApplication = sequelize.define(
    'JobApplication',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT('long'),
      },
      cvUrl: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('new', 'reviewing', 'shortlisted', 'rejected', 'hired'),
        defaultValue: 'new',
      },
      metadata: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'job_applications',
    }
  );

  return JobApplication;
};
