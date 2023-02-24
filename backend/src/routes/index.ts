import { Router } from 'express';
import questionRoutes from './questionRoutes';
import categoryRoutes from './categoryRoutes';

const router = Router();

router.use('/question',questionRoutes);
router.use('/category',categoryRoutes);

export default router;
                    