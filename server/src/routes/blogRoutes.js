import { Router } from 'express';
import { body } from 'express-validator';
import { listPosts, getPost, upsertPost, deletePost } from '../controllers/blogController.js';
import { authMiddleware, permit } from '../middleware/auth.js';

const router = Router();

router.get('/', listPosts);
router.get('/:slug', getPost);

router.post(
  '/',
  authMiddleware,
  permit('blog:write'),
  [body('title').notEmpty(), body('content').isLength({ min: 50 })],
  upsertPost
);

router.put(
  '/',
  authMiddleware,
  permit('blog:write'),
  [body('title').optional().notEmpty(), body('content').optional().isLength({ min: 50 })],
  upsertPost
);

router.delete('/:id', authMiddleware, permit('blog:write'), deletePost);

export default router;
