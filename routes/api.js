import express from 'express';

import userRoutes from './userRoutes.js';
import habitRoutes from './habitRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/habit', habitRoutes);
router.use('/category', categoryRoutes);
router.use('/', authRoutes); // for login, refresh, logout

export default router;
