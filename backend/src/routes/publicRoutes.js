const express = require('express');
const { body } = require('express-validator');
const contentController = require('../controllers/contentController');
const ecommerceController = require('../controllers/ecommerceController');
const contactController = require('../controllers/contactController');
const newsletterController = require('../controllers/newsletterController');
const blogController = require('../controllers/blogController');
const careerController = require('../controllers/careerController');

const router = express.Router();

router.get('/sections', contentController.listSections);
router.get('/pricing', contentController.listPricingPlans);
router.get('/gallery', contentController.listGalleryImages);
router.get('/settings/:key', contentController.getSetting);

router.get('/products', ecommerceController.listProducts);
router.post(
  '/orders',
  [
    body('customerName').notEmpty(),
    body('customerEmail').isEmail(),
    body('items').isArray({ min: 1 })
  ],
  ecommerceController.createOrder
);

router.post(
  '/contact',
  [body('name').notEmpty(), body('email').isEmail(), body('message').notEmpty()],
  contactController.submitContactForm
);

router.post('/newsletter/subscribe', [body('email').isEmail()], newsletterController.subscribe);

router.get('/blog', blogController.listPosts);
router.get('/jobs', careerController.listJobListings);
router.post('/jobs/apply', [body('jobId').notEmpty(), body('fullName').notEmpty(), body('email').isEmail()], careerController.submitApplication);

module.exports = router;
