const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const pricingController = require('../controllers/pricingController');

const router = Router();

router.get('/', pricingController.listPlans);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('name').notEmpty(), body('slug').notEmpty()],
  validate,
  pricingController.createPlan
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  validate,
  pricingController.updatePlan
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('superadmin'),
  pricingController.deletePlan
);

module.exports = router;
