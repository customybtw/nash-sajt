const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const domainController = require('../controllers/domainController');

const router = Router();

router.get('/', authMiddleware, requireRole('admin', 'superadmin'), domainController.listDomains);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('domain').notEmpty()],
  validate,
  domainController.createDomain
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  validate,
  domainController.updateDomain
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('superadmin'),
  domainController.deleteDomain
);

module.exports = router;
