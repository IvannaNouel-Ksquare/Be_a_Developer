import { Router } from 'express';
import answerRoutes from './answerRoutes';
import questionRoutes from './questionRoutes';

const router = Router();

router.use('/question',questionRoutes);
router.use('/answer',answerRoutes);

export default router;
                    