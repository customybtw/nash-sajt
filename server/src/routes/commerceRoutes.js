import { Router } from 'express';
import { body } from 'express-validator';
import { authMiddleware, permit } from '../middleware/auth.js';
import { listProducts, upsertProduct, deleteProduct, createOrder, listOrders } from '../controllers/commerceController.js';

const router = Router();

router.get('/products', listProducts);
router.post('/products', authMiddleware, permit('commerce:write'), upsertProduct);
router.put('/products', authMiddleware, permit('commerce:write'), upsertProduct);
router.delete('/products/:id', authMiddleware, permit('commerce:write'), deleteProduct);

router.post(
  '/orders',
  [
    body('customerName').notEmpty(),
    body('customerEmail').isEmail(),
    body('items').isArray({ min: 1 }),
  ],
  createOrder
);

router.get('/orders', authMiddleware, permit('commerce:read'), listOrders);

export default router;
