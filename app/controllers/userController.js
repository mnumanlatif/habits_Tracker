// controllers/habitController.js
import User from '../models/userModel.js';
import { userValidationSchema } from '../validations/createUserValidation.js';
import { updateUserValidationSchema } from '../validations/updateUserValidation.js';
import { handleValidation } from '../helpers/utils/validate.js';
import asyncHandler from '../helpers/utils/asyncHandler.js';
import { AppError } from '../helpers/utils/errorHandler.js';
import mongoose from 'mongoose';

// GET all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const createUsers = asyncHandler(async (req, res, next) => {
  const value = handleValidation(req.body, userValidationSchema);

  try {
    const existingUser = await User.findOne({
      $or: [
        { userName: value.userName },
        { email: value.email },
      ]
    });

    if (existingUser) {
      return next(new AppError('Username or email already exists', 409));
    }

    const user = new User(value);
    await user.save();

    res.status(201).json({ message: 'User created', user });

  } catch (err) {
    return next(err);
  }
});


const updateUsers = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID format', 400));
  }

  const value = handleValidation(req.body, updateUserValidationSchema, res, next);

  const user = await User.findByIdAndUpdate(
    id,
    { ...value, updatedAt: new Date() },
    { new: true }
  );

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ message: 'User Data updated', user });
});

const deleteUsers = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid user ID format', 400));
  }

  const user = await User.findOneAndDelete({ _id: id }); // ✅ trigger the pre hook

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({ message: 'User and related habits deleted successfully' });
});


export default {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};