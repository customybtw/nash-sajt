const sequelize = require('../config/database');

const User = require('./User')(sequelize);
const PageSection = require('./PageSection')(sequelize);
const ImageAsset = require('./ImageAsset')(sequelize);
const PricingPlan = require('./PricingPlan')(sequelize);
const ContactMessage = require('./ContactMessage')(sequelize);
const NewsletterSubscriber = require('./NewsletterSubscriber')(sequelize);
const BlogPost = require('./BlogPost')(sequelize);
const CareerPosition = require('./CareerPosition')(sequelize);
const JobApplication = require('./JobApplication')(sequelize);
const Product = require('./Product')(sequelize);
const Order = require('./Order')(sequelize);
const DomainHosting = require('./DomainHosting')(sequelize);
const PortfolioItem = require('./PortfolioItem')(sequelize);
const CustomFeature = require('./CustomFeature')(sequelize);
const AnalyticsIntegration = require('./AnalyticsIntegration')(sequelize);
const Setting = require('./Setting')(sequelize);
const Subscription = require('./Subscription')(sequelize);

// Associations
BlogPost.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(BlogPost, { as: 'posts', foreignKey: 'authorId' });

JobApplication.belongsTo(CareerPosition, { as: 'position', foreignKey: 'positionId' });
CareerPosition.hasMany(JobApplication, { as: 'applications', foreignKey: 'positionId' });

Order.belongsTo(User, { as: 'manager', foreignKey: 'managerId' });
User.hasMany(Order, { as: 'orders', foreignKey: 'managerId' });

Subscription.belongsTo(PricingPlan, { as: 'plan', foreignKey: 'planId' });
PricingPlan.hasMany(Subscription, { as: 'subscriptions', foreignKey: 'planId' });

PortfolioItem.belongsToMany(ImageAsset, { through: 'PortfolioImages', as: 'images' });
ImageAsset.belongsToMany(PortfolioItem, { through: 'PortfolioImages', as: 'portfolioItems' });

Product.belongsToMany(ImageAsset, { through: 'ProductImages', as: 'gallery' });
ImageAsset.belongsToMany(Product, { through: 'ProductImages', as: 'products' });

CustomFeature.belongsTo(PricingPlan, { as: 'plan', foreignKey: 'pricingPlanId' });
PricingPlan.hasMany(CustomFeature, { as: 'customFeatures', foreignKey: 'pricingPlanId' });

module.exports = {
  sequelize,
  User,
  PageSection,
  ImageAsset,
  PricingPlan,
  ContactMessage,
  NewsletterSubscriber,
  BlogPost,
  CareerPosition,
  JobApplication,
  Product,
  Order,
  DomainHosting,
  PortfolioItem,
  CustomFeature,
  AnalyticsIntegration,
  Setting,
  Subscription,
};
