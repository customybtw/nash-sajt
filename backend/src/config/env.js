const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile), override: true });

const required = ['PORT', 'JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length && process.env.NODE_ENV !== 'test') {
  console.warn(`Missing environment variables: ${missing.join(', ')}`);
}

const config = {
  port: process.env.PORT || 5000,
  appUrl: process.env.APP_URL || 'http://localhost:5173',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'development-secret',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nash_site',
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM || 'no-reply@nash-sajt.com',
  },
  analytics: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },
  payments: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalSecret: process.env.PAYPAL_SECRET,
  },
};

module.exports = config;
