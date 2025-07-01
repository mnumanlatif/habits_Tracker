import mongoose from 'mongoose';

import User from '../models/userModel.js';
import { AppError } from '../utils/errorHandler.js';

export const getAllUsers = async () => {
  return await User.find();
};

export const checkUserExists = async (userName, email) => {
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }]
  });
  if (existingUser) {
    throw new AppError('Username or email already exists', 409);
  }
};

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const updateUserById = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid user ID format', 400);
  }

  const updated = await User.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true }
  );

  if (!updated) {
    throw new AppError('User not found', 404);
  }

  return updated;
};

export const deleteUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid user ID format', 400);
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};
