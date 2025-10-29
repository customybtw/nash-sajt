import { Router } from 'express';
import { body } from 'express-validator';
import { authMiddleware, permit } from '../middleware/auth.js';
import { listImages, createImage, updateImage, deleteImage, uploader } from '../controllers/galleryController.js';

const router = Router();

router.get('/', listImages);

router.post(
  '/',
  authMiddleware,
  permit('gallery:write'),
  uploader.single('image'),
  [body('altText').notEmpty()],
  createImage
);

router.put('/:id', authMiddleware, permit('gallery:write'), updateImage);
router.delete('/:id', authMiddleware, permit('gallery:write'), deleteImage);

export default router;
