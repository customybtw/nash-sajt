const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const careerController = require('../controllers/careerController');

const router = Router();

router.get('/', careerController.listPositions);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('title').notEmpty(), body('applicationEmail').isEmail()],
  validate,
  careerController.createPosition
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  validate,
  careerController.updatePosition
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('superadmin'),
  careerController.deletePosition
);

router.post(
  '/:positionId/apply',
  [body('name').notEmpty(), body('email').isEmail(), body('message').isLength({ min: 20 })],
  validate,
  careerController.submitApplication
);

module.exports = router;
