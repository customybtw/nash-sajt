const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const analyticsController = require('../controllers/analyticsController');

const router = Router();

router.get('/', authMiddleware, requireRole('admin', 'superadmin'), analyticsController.listIntegrations);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('provider').notEmpty(), body('trackingId').notEmpty()],
  validate,
  analyticsController.upsertIntegration
);

module.exports = router;
