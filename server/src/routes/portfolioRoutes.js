const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const portfolioController = require('../controllers/portfolioController');

const router = Router();

router.get('/', portfolioController.listPortfolio);
router.get('/:slug', portfolioController.getPortfolioItem);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  [body('title').notEmpty()],
  validate,
  portfolioController.createPortfolioItem
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  validate,
  portfolioController.updatePortfolioItem
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  portfolioController.deletePortfolioItem
);

module.exports = router;
