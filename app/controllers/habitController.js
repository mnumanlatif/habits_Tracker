// controllers/habitController.js
import Habit from '../models/habitModel.js';
import { habitValidationSchema } from '../validations/createValidation.js';
import { updateHabitValidationSchema } from '../validations/updateHabitValidation.js';
import { handleValidation } from '../helpers/utils/validate.js';
import asyncHandler from '../helpers/utils/asyncHandler.js';
import { AppError } from '../helpers/utils/errorHandler.js';


// GET all habits
const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find();
  res.status(200).json(habits);
});

// CREATE a new habit
const createHabit = asyncHandler(async (req, res, next) => {
  const value = handleValidation(req.body, habitValidationSchema, res, next);

  const existing = await Habit.findOne({ userId: value.userId });
  if (existing) {
    return next(new AppError('Habit for this user already exists', 409));
  }

  const habit = new Habit(value);
  await habit.save();

  res.status(201).json({ message: 'Habit created', habit });
  
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
  getHabits,
  createHabit,
  updateHabit,
};
