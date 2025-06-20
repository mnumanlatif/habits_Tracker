// controllers/habitController.js
import Habit from '../models/habitModel.js';
import { habitValidationSchema } from '../validations/createValidation.js';
import { updateHabitValidationSchema } from '../validations/updateValidation.js';
import { handleValidation } from '../utils/validate.js';
import asyncHandler from '../utils/asyncHandler.js';

// Get all habits
const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// Create a new habit
const createHabit = asyncHandler(async (req, res) => {
  const value = handleValidation(req.body, habitValidationSchema, res);

  const existing = await Habit.findOne({ userId: value.userId });
  if (existing) {
    return res.status(409).json({ error: 'Habit for this user already exists' });
  }

  const habit = new Habit(value);
  await habit.save();
  res.status(201).json({ message: 'Habit created', habit });
});

// Update a habit
const updateHabit = asyncHandler(async (req, res) => {
  const value = handleValidation(req.body, updateHabitValidationSchema, res);
  const { id } = req.params;

  const habit = await Habit.findByIdAndUpdate(
    id,
    { ...value, updatedAt: new Date() },
    { new: true }
  );

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  res.status(200).json({ message: 'Habit updated', habit });
});

export default {
  getHabits,
  createHabit,
  updateHabit,
};
