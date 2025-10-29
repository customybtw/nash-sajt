const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const pageController = require('../controllers/pageController');

const router = Router();

router.get('/', pageController.getSections);
router.get('/:id', pageController.getSection);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  [
    body('page').notEmpty(),
    body('slug').notEmpty(),
    body('title').notEmpty(),
  ],
  validate,
  pageController.createSection
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  [body('title').optional().notEmpty()],
  validate,
  pageController.updateSection
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  pageController.deleteSection
);

module.exports = router;
