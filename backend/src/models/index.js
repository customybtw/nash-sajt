const sequelize = require('../config/database');
const User = require('./User');
const PageSection = require('./PageSection');
const GalleryImage = require('./GalleryImage');
const PricingPlan = require('./PricingPlan');
const ContactMessage = require('./ContactMessage');
const NewsletterSubscriber = require('./NewsletterSubscriber');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const JobListing = require('./JobListing');
const JobApplication = require('./JobApplication');
const BlogPost = require('./BlogPost');
const Setting = require('./Setting');

// Associations
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
Order.hasMany(OrderItem, { as: 'items' });
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

JobListing.hasMany(JobApplication, { as: 'applications' });
JobApplication.belongsTo(JobListing);

BlogPost.belongsTo(User, { as: 'author' });
User.hasMany(BlogPost, { foreignKey: 'authorId', as: 'posts' });

module.exports = {
  sequelize,
  User,
  PageSection,
  GalleryImage,
  PricingPlan,
  ContactMessage,
  NewsletterSubscriber,
  Product,
  Order,
  OrderItem,
  JobListing,
  JobApplication,
  BlogPost,
  Setting
};
