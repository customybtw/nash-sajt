const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const subscriptionController = require('../controllers/subscriptionController');

const router = Router();

router.get('/', authMiddleware, requireRole('admin', 'superadmin'), subscriptionController.listSubscriptions);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('clientName').notEmpty(), body('clientEmail').isEmail(), body('planId').notEmpty()],
  validate,
  subscriptionController.createSubscription
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  validate,
  subscriptionController.updateSubscription
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('superadmin'),
  subscriptionController.deleteSubscription
);

module.exports = router;
