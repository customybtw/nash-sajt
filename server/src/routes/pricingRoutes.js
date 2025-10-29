import { Router } from 'express';
import { authMiddleware, permit } from '../middleware/auth.js';
import { listPricingPlans, upsertPricingPlan, deletePricingPlan } from '../controllers/pricingController.js';

const router = Router();

router.get('/', listPricingPlans);
router.post('/', authMiddleware, permit('pricing:write'), upsertPricingPlan);
router.put('/', authMiddleware, permit('pricing:write'), upsertPricingPlan);
router.delete('/:id', authMiddleware, permit('pricing:write'), deletePricingPlan);

export default router;
