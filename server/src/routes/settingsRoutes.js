const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const settingsController = require('../controllers/settingsController');

const router = Router();

router.get('/', authMiddleware, requireRole('admin', 'superadmin'), settingsController.listSettings);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('key').notEmpty()],
  validate,
  settingsController.upsertSetting
);

module.exports = router;
