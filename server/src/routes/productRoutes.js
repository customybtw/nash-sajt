const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const productController = require('../controllers/productController');

const router = Router();

router.get('/', productController.listProducts);
router.get('/:slug', productController.getProduct);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  [body('name').notEmpty(), body('price').isFloat({ min: 0 })],
  validate,
  productController.createProduct
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  validate,
  productController.updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('superadmin'),
  productController.deleteProduct
);

module.exports = router;
