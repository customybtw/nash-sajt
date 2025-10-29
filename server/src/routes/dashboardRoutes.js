const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const dashboardController = require('../controllers/dashboardController');

const router = Router();

router.get('/', authMiddleware, requireRole('admin', 'superadmin'), dashboardController.overview);

module.exports = router;
