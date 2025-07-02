import express from 'express';

import userRoutes from './userRoutes.ts';
import habitRoutes from './habitRoutes.ts';
import categoryRoutes from './categoryRoutes.ts';
import authRoutes from './authRoutes.ts';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/habit', habitRoutes);
router.use('/category', categoryRoutes);
router.use('/', authRoutes); 

export default router;
