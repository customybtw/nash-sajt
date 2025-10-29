import { Router } from 'express';
import authRoutes from './authRoutes.js';
import contentRoutes from './contentRoutes.js';
import galleryRoutes from './galleryRoutes.js';
import pricingRoutes from './pricingRoutes.js';
import contactRoutes from './contactRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import commerceRoutes from './commerceRoutes.js';
import jobRoutes from './jobRoutes.js';
import blogRoutes from './blogRoutes.js';
import domainRoutes from './domainRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/gallery', galleryRoutes);
router.use('/pricing', pricingRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/commerce', commerceRoutes);
router.use('/jobs', jobRoutes);
router.use('/blog', blogRoutes);
router.use('/domains', domainRoutes);

export default router;
