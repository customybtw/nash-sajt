import { Router } from 'express';
import { body } from 'express-validator';
import { submitContactForm, listContactMessages, updateContactStatus } from '../controllers/contactController.js';
import { authMiddleware, permit } from '../middleware/auth.js';

const router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('email').isEmail(), body('message').isLength({ min: 10 })],
  submitContactForm
);

router.get('/', authMiddleware, permit('contact:read'), listContactMessages);
router.patch('/:id', authMiddleware, permit('contact:write'), updateContactStatus);

export default router;
