import Habit from '../models/habitModel.js';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import { AppError } from '../utils/errorHandler.js';
import mongoose from 'mongoose';

export const findAllHabits = async () => {
  return await Habit.find();
};

export const findHabitsByUser = async (userId) => {
  const habits = await Habit.find({ userId });
  if (!habits || habits.length === 0) {
    throw new AppError('No habits found for this user', 404);
  }
  return habits;
};

export const findHabitsByCategory = async (categoryId) => {
  const habits = await Habit.find({ categoryId });
  if (!habits || habits.length === 0) {
    throw new AppError('No habits found for this category', 404);
  }
  return habits;
};

export const createHabit = async (data) => {
  // Validate MongoDB ObjectIds
  if (!mongoose.Types.ObjectId.isValid(data.userId)) {
    throw new AppError('Invalid user ID format', 400);
  }
  if (!mongoose.Types.ObjectId.isValid(data.categoryId)) {
    throw new AppError('Invalid category ID format', 400);
  }

  // Check if user exists
  const userExists = await User.exists({ _id: data.userId });
  if (!userExists) {
    throw new AppError('User does not exist', 404);
  }

  // Check if category exists
  const categoryExists = await Category.exists({ _id: data.categoryId });
  if (!categoryExists) {
    throw new AppError('Category does not exist', 404);
  }

  try {
    const habit = new Habit(data);
    return await habit.save();
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      throw new AppError(`Duplicate value for ${field}`, 409);
    }
    throw err;
  }
};

export const updateHabitById = async (id, data) => {
  const updated = await Habit.findByIdAndUpdate(
    id,
    { ...data, updatedAt: new Date() },
    { new: true }
  );
  if (!updated) {
    throw new AppError('Habit not found', 404);
  }
  return updated;
};
