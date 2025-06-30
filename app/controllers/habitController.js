import { habitValidationSchema } from '../validations/createHabitValidation.js';
import { updateHabitValidationSchema } from '../validations/updateHabitValidation.js';
import { handleValidation } from '../utils/validate.js';
import asyncHandler from '../utils/asyncHandler.js';

import {
  findAllHabits,
  findHabitsByUser,
  findHabitsByCategory,
  createHabit as createHabitService,
  updateHabitById,
} from '../services/habitService.js';

const getHabitsAll = asyncHandler(async (req, res) => {
  const habits = await findAllHabits();
  res.status(200).json(habits);
});

const getHabitsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const habits = await findHabitsByUser(userId);
  res.status(200).json(habits);
});

const getHabitsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const habits = await findHabitsByCategory(categoryId);
  res.status(200).json(habits);
});

const createHabit = asyncHandler(async (req, res) => {
  const validatedData = handleValidation(req.body, habitValidationSchema);
  const habit = await createHabitService(validatedData);
  res.status(201).json({ message: 'Habit created', habit });
});

const updateHabit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const validatedData = handleValidation(req.body, updateHabitValidationSchema);
  const updatedHabit = await updateHabitById(id, validatedData);
  res.status(200).json({ message: 'Habit updated', habit: updatedHabit });
});

export default {
  getHabitsAll,
  getHabitsByUser,
  getHabitsByCategory,
  createHabit,
  updateHabit,
};
