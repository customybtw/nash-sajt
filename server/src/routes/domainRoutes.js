import { Router } from 'express';
import { authMiddleware, permit } from '../middleware/auth.js';
import { listDomainRecords, upsertDomainRecord, deleteDomainRecord } from '../controllers/domainController.js';

const router = Router();

router.get('/', authMiddleware, permit('domains:read'), listDomainRecords);
router.post('/', authMiddleware, permit('domains:write'), upsertDomainRecord);
router.put('/', authMiddleware, permit('domains:write'), upsertDomainRecord);
router.delete('/:id', authMiddleware, permit('domains:write'), deleteDomainRecord);

export default router;
