const express = require('express');
const authenticate = require('../middleware/auth');
const contentController = require('../controllers/contentController');
const { pageValidation, galleryValidation, pricingValidation } = require('../validators/contentValidators');

const router = express.Router();

router.get('/pages', contentController.getPages);
router.get('/pages/:slug', contentController.getPage);
router.put('/pages/:slug', authenticate(['admin', 'editor']), pageValidation, contentController.upsertPage);

router.get('/gallery', contentController.listGallery);
router.post('/gallery', authenticate(['admin', 'editor']), galleryValidation, contentController.createGalleryImage);
router.put('/gallery/:id', authenticate(['admin', 'editor']), galleryValidation, contentController.updateGalleryImage);
router.delete('/gallery/:id', authenticate(['admin']), contentController.deleteGalleryImage);

router.get('/pricing', contentController.listPricingPlans);
router.post('/pricing', authenticate(['admin']), pricingValidation, contentController.upsertPricingPlan);
router.put('/pricing/:id', authenticate(['admin']), pricingValidation, contentController.upsertPricingPlan);

module.exports = router;
