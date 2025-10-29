const { Router } = require('express');

const authRoutes = require('./authRoutes');
const pageRoutes = require('./pageRoutes');
const galleryRoutes = require('./galleryRoutes');
const pricingRoutes = require('./pricingRoutes');
const contactRoutes = require('./contactRoutes');
const newsletterRoutes = require('./newsletterRoutes');
const blogRoutes = require('./blogRoutes');
const careerRoutes = require('./careerRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const domainRoutes = require('./domainRoutes');
const settingsRoutes = require('./settingsRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const paymentRoutes = require('./paymentRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/pages', pageRoutes);
router.use('/gallery', galleryRoutes);
router.use('/pricing', pricingRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/blog', blogRoutes);
router.use('/careers', careerRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/domains', domainRoutes);
router.use('/settings', settingsRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/payments', paymentRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
