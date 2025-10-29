const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const NewsletterSubscriber = sequelize.define(
    'NewsletterSubscriber',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      subscribedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      unsubscribedAt: {
        type: DataTypes.DATE,
      },
      preferences: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      tableName: 'newsletter_subscribers',
    }
  );

  return NewsletterSubscriber;
};
