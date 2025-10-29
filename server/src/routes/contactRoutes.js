const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const contactController = require('../controllers/contactController');

const router = Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  validate,
  contactController.submitContactForm
);

router.get('/', authMiddleware, requireRole('admin', 'superadmin'), contactController.listMessages);

router.patch(
  '/:id/status',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('status').isIn(['new', 'in_progress', 'resolved'])],
  validate,
  contactController.updateStatus
);

module.exports = router;
