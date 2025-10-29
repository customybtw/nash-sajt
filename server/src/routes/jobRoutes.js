import { Router } from 'express';
import { authMiddleware, permit } from '../middleware/auth.js';
import { listJobs, upsertJob, deleteJob } from '../controllers/jobController.js';

const router = Router();

router.get('/', listJobs);
router.post('/', authMiddleware, permit('jobs:write'), upsertJob);
router.put('/', authMiddleware, permit('jobs:write'), upsertJob);
router.delete('/:id', authMiddleware, permit('jobs:write'), deleteJob);

export default router;
