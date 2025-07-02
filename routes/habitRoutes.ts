import express from 'express';

import habitController from '../app/controllers/habitController.ts';
import { protect } from '../app/middleware/authMiddleware.ts';

const router = express.Router();

// Protected route: Only accessible if user is authenticated
router.get('/', protect, habitController.getHabitsAll);

// Public or user-specific routes
router.get('/user/:userId', habitController.getHabitsByUser);
router.get('/category/:categoryId', habitController.getHabitsByCategory);
router.post('/create', habitController.createHabit);
router.put('/:id', habitController.updateHabit);

export default router;
