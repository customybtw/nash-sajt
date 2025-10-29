const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const { sequelize, User, PricingPlan } = require('./models');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');

const PORT = process.env.PORT || 4000;

const app = express();
const uploadsDir = path.join(process.cwd(), 'backend', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*', credentials: true }));
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const bootstrap = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const userCount = await User.count();
    if (userCount === 0) {
      const bcrypt = require('bcryptjs');
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme', 12),
        role: 'admin'
      });
      console.log('Default admin user created');
    }

    const plansCount = await PricingPlan.count();
    if (plansCount === 0) {
      await PricingPlan.bulkCreate([
        {
          name: 'Basic Website',
          slug: '40-eur-plan',
          priceMonthly: 40,
          description: 'Essential features for a professional presence.',
          features: [
            'Responsive design',
            'SEO-ready structure',
            'Content management via admin panel'
          ]
        },
        {
          name: 'Growth Website',
          slug: '70-eur-plan',
          priceMonthly: 70,
          description: 'Full-featured site with lead generation & newsletters.',
          features: [
            'Contact request forms',
            'Newsletter management',
            'Advanced analytics integration'
          ],
          highlight: true
        },
        {
          name: 'Premium E-shop',
          slug: '100-eur-plan',
          priceMonthly: 100,
          description: 'High-profile e-commerce experience with payments.',
          features: [
            'Custom design system',
            'Integrated e-commerce',
            'Stripe & PayPal support'
          ]
        },
        {
          name: 'Commission E-shop',
          slug: 'commission-plan',
          priceMonthly: null,
          billingType: 'commission',
          description: 'Pay as you grow e-commerce solution.',
          features: [
            'Full storefront management',
            'Inventory tracking',
            'Revenue share agreement'
          ]
        }
      ]);
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

bootstrap();
