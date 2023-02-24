import { Router } from 'express';
import { UserRouter } from './userRoutes';
import questionRoutes from './questionRoutes';
import categoryRoutes from './categoryRoutes';
import fbUserRoutes from './fbUserRoutes';

const router = Router();

router.use('/question', questionRoutes);
router.use('/category', categoryRoutes);
router.use('/users', UserRouter);
router.use('/user', fbUserRoutes);


export default router;
