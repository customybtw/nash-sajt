const express = require('express');
const authenticate = require('../middleware/auth');
const careerController = require('../controllers/careerController');

const router = express.Router();

router.get('/', careerController.listCareers);
router.post('/', authenticate(['admin', 'editor']), careerController.upsertCareer);
router.put('/:id', authenticate(['admin', 'editor']), careerController.upsertCareer);
router.delete('/:id', authenticate(['admin']), careerController.deleteCareer);

module.exports = router;
