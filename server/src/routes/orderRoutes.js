const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const orderController = require('../controllers/orderController');

const router = Router();

router.get('/', authMiddleware, requireRole('admin', 'superadmin'), orderController.listOrders);

router.post(
  '/',
  [
    body('customerName').notEmpty(),
    body('customerEmail').isEmail(),
    body('items').isArray({ min: 1 }),
  ],
  validate,
  orderController.createOrder
);

router.patch(
  '/:id/status',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  validate,
  orderController.updateOrderStatus
);

module.exports = router;
