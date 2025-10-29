import { Router } from 'express';
import { body } from 'express-validator';
import { subscribe, listSubscribers, sendNewsletter, toggleSubscriber } from '../controllers/newsletterController.js';
import { authMiddleware, permit } from '../middleware/auth.js';

const router = Router();

router.post('/', [body('email').isEmail()], subscribe);
router.get('/', authMiddleware, permit('newsletter:read'), listSubscribers);
router.post('/send', authMiddleware, permit('newsletter:write'), sendNewsletter);
router.patch('/:id/toggle', authMiddleware, permit('newsletter:write'), toggleSubscriber);

export default router;
