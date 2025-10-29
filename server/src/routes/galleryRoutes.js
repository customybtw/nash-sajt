const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const galleryController = require('../controllers/galleryController');

const router = Router();

router.get('/', galleryController.listImages);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  [body('title').notEmpty(), body('url').isURL()],
  validate,
  galleryController.createImage
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  validate,
  galleryController.updateImage
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  galleryController.deleteImage
);

module.exports = router;
