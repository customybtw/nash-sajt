import { Router } from 'express';
import { body } from 'express-validator';
import { login, me, updateProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  login
);

router.get('/me', authMiddleware, me);
router.put('/me', authMiddleware, updateProfile);

export default router;
