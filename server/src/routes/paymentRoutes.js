const { Router } = require('express');
const paymentController = require('../controllers/paymentController');

const router = Router();

router.post('/stripe/session', paymentController.createStripeSession);
router.post('/paypal/order', paymentController.createPaypalOrder);

module.exports = router;
