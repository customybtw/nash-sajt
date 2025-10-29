const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { authenticate, authorize } = require('../middleware/auth');
const contentController = require('../controllers/contentController');
const ecommerceController = require('../controllers/ecommerceController');
const contactController = require('../controllers/contactController');
const newsletterController = require('../controllers/newsletterController');
const blogController = require('../controllers/blogController');
const careerController = require('../controllers/careerController');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'backend', 'uploads')),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
  })
});

const router = express.Router();

router.use(authenticate);

router.get('/sections', authorize(['admin', 'editor']), contentController.listSections);
router.post(
  '/sections',
  authorize(['admin', 'editor']),
  [body('slug').notEmpty(), body('title').notEmpty()],
  contentController.upsertSection
);
router.delete('/sections/:id', authorize(['admin']), contentController.deleteSection);

router.get('/gallery', authorize(['admin', 'editor']), contentController.listGalleryImages);
router.post('/gallery', authorize(['admin', 'editor']), upload.single('image'), contentController.createGalleryImage);
router.delete('/gallery/:id', authorize(['admin']), contentController.deleteGalleryImage);

router.get('/pricing', authorize(['admin', 'editor']), contentController.listPricingPlans);
router.post('/pricing', authorize(['admin']), contentController.upsertPricingPlan);
router.put('/pricing/:id', authorize(['admin']), contentController.upsertPricingPlan);
router.delete('/pricing/:id', authorize(['admin']), contentController.deletePricingPlan);

router.get('/products', authorize(['admin', 'editor']), ecommerceController.listProducts);
router.post('/products', authorize(['admin']), upload.single('image'), [body('name').notEmpty(), body('price').isFloat()], ecommerceController.upsertProduct);
router.put('/products/:id', authorize(['admin']), upload.single('image'), ecommerceController.upsertProduct);
router.delete('/products/:id', authorize(['admin']), ecommerceController.deleteProduct);

router.get('/orders', authorize(['admin', 'editor']), ecommerceController.listOrders);
router.patch('/orders/:id/status', authorize(['admin', 'editor']), ecommerceController.updateOrderStatus);

router.get('/messages', authorize(['admin', 'editor']), contactController.listContactMessages);
router.patch('/messages/:id/status', authorize(['admin', 'editor']), contactController.updateContactStatus);

router.get('/subscribers', authorize(['admin', 'editor']), newsletterController.listSubscribers);
router.post('/newsletter/send', authorize(['admin']), [body('subject').notEmpty(), body('content').notEmpty()], newsletterController.sendNewsletter);

router.get('/blog', authorize(['admin', 'editor']), blogController.listPosts);
router.post('/blog', authorize(['admin', 'editor']), upload.single('featuredImage'), [body('title').notEmpty(), body('content').notEmpty()], blogController.upsertPost);
router.put('/blog/:id', authorize(['admin', 'editor']), upload.single('featuredImage'), blogController.upsertPost);
router.delete('/blog/:id', authorize(['admin']), blogController.deletePost);

router.get('/jobs', authorize(['admin', 'editor']), careerController.listJobListings);
router.post('/jobs', authorize(['admin', 'editor']), [body('title').notEmpty(), body('description').notEmpty()], careerController.upsertJobListing);
router.put('/jobs/:id', authorize(['admin', 'editor']), careerController.upsertJobListing);
router.delete('/jobs/:id', authorize(['admin']), careerController.deleteJobListing);
router.get('/applications', authorize(['admin', 'editor']), careerController.listApplications);

router.put('/settings/:key', authorize(['admin']), contentController.updateSetting);
router.get('/settings/:key', authorize(['admin', 'editor']), contentController.getSetting);

module.exports = router;
