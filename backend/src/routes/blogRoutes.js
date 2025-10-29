const express = require('express');
const authenticate = require('../middleware/auth');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', blogController.listPosts);
router.get('/:slug', blogController.getPost);
router.post('/', authenticate(['admin', 'editor']), blogController.upsertPost);
router.put('/:id', authenticate(['admin', 'editor']), blogController.upsertPost);
router.delete('/:id', authenticate(['admin']), blogController.deletePost);

module.exports = router;
