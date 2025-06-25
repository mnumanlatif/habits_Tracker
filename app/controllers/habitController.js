// controllers/habitController.js
import Habit from '../models/habitModel.js';
import { habitValidationSchema } from '../validations/createHabitValidation.js';
import { updateHabitValidationSchema } from '../validations/updateHabitValidation.js';
import { handleValidation } from '../helpers/utils/validate.js';
import asyncHandler from '../helpers/utils/asyncHandler.js';
import { AppError } from '../helpers/utils/errorHandler.js';


// GET all habits
const getHabitsAll = asyncHandler(async (req, res) => {
    const habits = await Habit.find();
  res.status(200).json(habits);
});


const getHabitsByUser = asyncHandler(async (req, res, next) => {
  const habits = await Habit.find({ userId: req.params.userId });

  if (!habits || habits.length === 0) {
    return next(new AppError('No habits found for this user', 404));
  }

  res.status(200).json(habits);
});

const getHabitsByCategory = asyncHandler(async (req, res, next) => {
  const habits = await Habit.find({ categoryId: req.params.categoryId });

  if (!habits || habits.length === 0) {
    return next(new AppError('No habits found for this category', 404));
  }

  res.status(200).json(habits);
});

// CREATE a new habit
const createHabit = asyncHandler(async (req, res, next) => {
  const value = handleValidation(req.body, habitValidationSchema, res, next);

  try {
  const habit = new Habit(value);
  await habit.save();
  res.status(201).json({ message: 'Habit created', habit });
} catch (err) {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return next(new AppError(`Duplicate value for ${field}`, 409));
  }
  next(err);
}

});


const updateHabit = asyncHandler(async (req, res, next) => {
  const value = handleValidation(req.body, updateHabitValidationSchema, res, next);
  const { id } = req.params;

  const habit = await Habit.findByIdAndUpdate(
    id,
    { ...value, updatedAt: new Date() },
    { new: true }
  );

  if (!habit) {
    return next(new AppError('Habit not found', 404));
  }

  res.status(200).json({ message: 'Habit updated', habit });
});


export default {
  getHabitsByUser,
  getHabitsByCategory,
  getHabitsAll,
  createHabit,
  updateHabit,
};