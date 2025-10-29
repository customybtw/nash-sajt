import sequelize from '../config/database.js';
import './Role.js';
import './User.js';
import './SiteSetting.js';
import './ImageAsset.js';
import './PageSection.js';
import './PricingPlan.js';
import './ContactMessage.js';
import './NewsletterSubscriber.js';
import './Product.js';
import { Order, OrderItem } from './Order.js';
import './JobListing.js';
import './BlogPost.js';
import './PortfolioItem.js';
import './DomainRecord.js';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Failed to synchronize database:', error);
    throw error;
  }
};

export { sequelize, syncDatabase, Order, OrderItem };
