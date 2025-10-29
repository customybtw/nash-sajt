import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { sequelize, syncDatabase } from '../models/index.js';
import Role from '../models/Role.js';
import User from '../models/User.js';
import PricingPlan from '../models/PricingPlan.js';
import PageSection from '../models/PageSection.js';
import SiteSetting from '../models/SiteSetting.js';
import JobListing from '../models/JobListing.js';
import PortfolioItem from '../models/PortfolioItem.js';

dotenv.config();

const seed = async () => {
  try {
    await syncDatabase();

    const [adminRole] = await Role.findOrCreate({
      where: { name: 'Administrator' },
      defaults: {
        description: 'Full access to all features',
        permissions: [
          'content:write',
          'gallery:write',
          'pricing:write',
          'contact:read',
          'contact:write',
          'newsletter:read',
          'newsletter:write',
          'commerce:write',
          'commerce:read',
          'jobs:write',
          'blog:write',
          'domains:write',
          'domains:read',
          'settings:write',
          'portfolio:write',
        ],
      },
    });

    await User.findOrCreate({
      where: { email: 'admin@example.com' },
      defaults: {
        firstName: 'Admin',
        lastName: 'User',
        password: await bcrypt.hash('ChangeMe123!', 10),
        roleId: adminRole.id,
      },
    });

    const plans = [
      {
        name: '40€ Plan',
        price: 40,
        description: 'A basic website with essential features.',
        features: [
          'Responsive one-page website',
          'Contact form integration',
          'SEO-ready structure',
        ],
      },
      {
        name: '70€ Plan',
        price: 70,
        description:
          'Full-featured website with request forms, newsletter, and intuitive admin panel.',
        features: [
          'Everything in 40€ plan',
          'Newsletter management',
          'Leads dashboard',
        ],
      },
      {
        name: '100€ Plan',
        price: 100,
        description: 'High-profile website with custom design, e-shop, and payment integration.',
        features: [
          'Bespoke UI/UX design',
          'Integrated e-commerce',
          'Payment gateway setup',
        ],
      },
      {
        name: 'Free/Individual Plan',
        price: 0,
        description: 'Commission-based e-shop partnership for ambitious founders.',
        features: ['Zero upfront cost', 'Revenue sharing agreement', 'Full storefront setup'],
      },
    ];

    await Promise.all(
      plans.map((plan) =>
        PricingPlan.findOrCreate({
          where: { name: plan.name },
          defaults: { ...plan, slug: plan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
        })
      )
    );

    await SiteSetting.findOrCreate({
      where: { key: 'contact_inbox' },
      defaults: { value: 'studio@example.com', description: 'Primary inbox for contact form leads' },
    });

    await SiteSetting.findOrCreate({
      where: { key: 'google_analytics_id' },
      defaults: { value: process.env.GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX' },
    });

    await PageSection.findOrCreate({
      where: { slug: 'hero', page: 'home' },
      defaults: {
        title: 'Crafted digital experiences for thriving small businesses',
        subtitle: 'Web design, e-commerce, and marketing tailored to your growth goals.',
        content:
          'Our studio delivers lightning-fast, SEO-optimized websites with a powerful admin panel so you stay in control of your story.',
        metaTitle: 'Professional Websites & Marketing for Individuals and SMEs',
        metaDescription:
          'Launch a modern, responsive website with newsletter, e-commerce, and marketing features managed from one intuitive dashboard.',
      },
    });

    await JobListing.findOrCreate({
      where: { slug: 'senior-ux-designer' },
      defaults: {
        title: 'Senior UX Designer',
        location: 'Remote',
        employmentType: 'Contract',
        description:
          'Lead experience design for premium client projects with a focus on accessibility and conversion.',
        requirements: ['5+ years in UX/UI', 'Portfolio of responsive web apps'],
        responsibilities: ['Design user journeys', 'Collaborate with developers', 'Prototype interfaces'],
      },
    });

    await PortfolioItem.findOrCreate({
      where: { slug: 'artisan-bakery' },
      defaults: {
        title: 'Artisan Bakery Ecommerce',
        category: 'E-commerce',
        description: 'A warm, conversion-focused shop with storytelling product pages and loyalty program.',
        tags: ['ecommerce', 'branding', 'marketing'],
      },
    });

    console.log('Seed data created');
    await sequelize.close();
  } catch (error) {
    console.error('Failed to seed database', error);
    process.exit(1);
  }
};

seed();
