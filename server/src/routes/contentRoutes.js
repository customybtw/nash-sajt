import { Router } from 'express';
import { body } from 'express-validator';
import {
  getPageSections,
  upsertSection,
  deleteSection,
  getSettings,
  updateSetting,
  listPortfolio,
  upsertPortfolioItem,
  deletePortfolioItem,
} from '../controllers/contentController.js';
import { authMiddleware, permit } from '../middleware/auth.js';

const router = Router();

router.get('/pages/:page', getPageSections);
router.get('/settings', getSettings);
router.get('/portfolio', listPortfolio);

router.post(
  '/pages',
  authMiddleware,
  permit('content:write'),
  [body('page').notEmpty(), body('title').notEmpty()],
  upsertSection
);

router.put(
  '/pages/:id',
  authMiddleware,
  permit('content:write'),
  [body('title').optional().notEmpty()],
  upsertSection
);

router.delete('/pages/:id', authMiddleware, permit('content:write'), deleteSection);

router.put('/settings/:key', authMiddleware, permit('settings:write'), updateSetting);

router.post('/portfolio', authMiddleware, permit('portfolio:write'), upsertPortfolioItem);
router.put('/portfolio', authMiddleware, permit('portfolio:write'), upsertPortfolioItem);
router.delete('/portfolio/:id', authMiddleware, permit('portfolio:write'), deletePortfolioItem);

export default router;
