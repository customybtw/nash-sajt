const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const newsletterController = require('../controllers/newsletterController');

const router = Router();

router.post('/', [body('email').isEmail()], validate, newsletterController.subscribe);
router.post('/unsubscribe', [body('email').isEmail()], validate, newsletterController.unsubscribe);
router.get('/', authMiddleware, requireRole('admin', 'superadmin'), newsletterController.listSubscribers);

module.exports = router;
