const express = require('express');
const authenticate = require('../middleware/auth');
const ecommerceController = require('../controllers/ecommerceController');

const router = express.Router();

router.get('/products', ecommerceController.listProducts);
router.get('/products/:slug', ecommerceController.getProduct);
router.post('/products', authenticate(['admin']), ecommerceController.upsertProduct);
router.put('/products/:id', authenticate(['admin']), ecommerceController.upsertProduct);
router.delete('/products/:id', authenticate(['admin']), ecommerceController.deleteProduct);

router.get('/orders', authenticate(['admin']), ecommerceController.listOrders);
router.post('/orders', ecommerceController.createOrder);

module.exports = router;
