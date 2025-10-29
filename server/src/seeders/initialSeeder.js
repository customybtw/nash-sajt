const dotenv = require('dotenv');
const sequelize = require('../config/database');
const {
  User,
  PricingPlan,
  CustomFeature,
  PageSection,
  AnalyticsIntegration,
} = require('../models');

dotenv.config();

const seed = async () => {
  await sequelize.sync({ alter: true });

  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL;
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD;

  if (adminEmail && adminPassword) {
    const [admin] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: 'Site Administrator',
        password: adminPassword,
        role: 'superadmin',
      },
    });
    // eslint-disable-next-line no-console
    console.log(`Admin user ready: ${admin.email}`);
  }

  const planData = [
    {
      name: 'Essential Website',
      slug: 'essential-website',
      price: 40,
      billingCycle: 'monthly',
      description: 'Perfect for getting started with a professional presence.',
      features: [
        'Responsive single-page site',
        'SEO-ready content structure',
        'Contact form with email notifications',
        'Up to 5 managed content sections',
      ],
      metadata: { highlight: 'Best for individuals' },
    },
    {
      name: 'Business Growth',
      slug: 'business-growth',
      price: 70,
      billingCycle: 'monthly',
      description: 'Full-featured site with lead generation tools.',
      features: [
        'Multi-page website',
        'Advanced contact & request forms',
        'Newsletter signup and automation tools',
        'Easy-to-use admin dashboard',
      ],
      metadata: { highlight: 'Great for small businesses' },
    },
    {
      name: 'Premium Commerce',
      slug: 'premium-commerce',
      price: 100,
      billingCycle: 'monthly',
      description: 'High profile digital experience with e-commerce.',
      features: [
        'Custom design system',
        'Integrated online shop',
        'Stripe & PayPal payment support',
        'Inventory and order management',
      ],
      metadata: { highlight: 'Everything you need to sell online' },
    },
    {
      name: 'E-shop Partnership',
      slug: 'eshop-partnership',
      price: null,
      billingCycle: 'commission',
      description: 'Zero upfront cost: we grow with your e-commerce.',
      features: [
        'Full e-commerce platform',
        'Custom marketing and campaign strategy',
        'Commission-based collaboration',
        'Dedicated success manager',
      ],
      metadata: { highlight: 'Pay as you sell' },
    },
  ];

  for (const plan of planData) {
    const [record] = await PricingPlan.findOrCreate({
      where: { slug: plan.slug },
      defaults: plan,
    });

    if (record.slug === 'premium-commerce') {
      await CustomFeature.findOrCreate({
        where: { name: 'Integrated E-Shop', pricingPlanId: record.id },
        defaults: {
          description: 'Complete storefront with checkout and inventory.',
          planLevel: 'premium',
          pricingPlanId: record.id,
        },
      });
    }
  }

  const pages = [
    {
      page: 'home',
      slug: 'hero',
      title: 'Digital experiences that convert',
      subtitle: 'Web design, development, and growth services',
      content:
        '<p>Launch a modern website backed by a powerful admin panel and growth-ready features.</p>',
      metaTitle: 'Nash Sajt — Professional Websites & Marketing',
      metaDescription: 'Grow online with a custom website, admin dashboard, SEO optimization, and marketing support.',
      order: 1,
    },
    {
      page: 'about',
      slug: 'mission',
      title: 'Helping brands shine online',
      content:
        '<p>We design high-impact digital presences for individuals and small businesses.</p>',
      order: 1,
    },
  ];

  for (const page of pages) {
    await PageSection.findOrCreate({
      where: { page: page.page, slug: page.slug },
      defaults: page,
    });
  }

  if (process.env.GOOGLE_ANALYTICS_ID) {
    await AnalyticsIntegration.findOrCreate({
      where: { provider: 'google-analytics' },
      defaults: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        metadata: { description: 'Google Analytics 4 property' },
      },
    });
  }

  await sequelize.close();
};

seed()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });
