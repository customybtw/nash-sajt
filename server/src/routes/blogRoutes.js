const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const validate = require('../middleware/validate');
const blogController = require('../controllers/blogController');

const router = Router();

router.get('/', blogController.listPosts);
router.get('/:slug', blogController.getPost);

router.post(
  '/',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  [body('title').notEmpty(), body('content').isLength({ min: 50 })],
  validate,
  blogController.createPost
);

router.put(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin', 'editor'),
  validate,
  blogController.updatePost
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin', 'superadmin'),
  blogController.deletePost
);

module.exports = router;
