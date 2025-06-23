// controllers/habitController.js
import User from '../models/userModel.js';
import { userValidationSchema } from '../validations/userValidation.js';
import { updateUserValidationSchema } from '../validations/updateUserValidation.js';
import { handleValidation } from '../helpers/utils/validate.js';
import asyncHandler from '../helpers/utils/asyncHandler.js';
import { AppError } from '../helpers/utils/errorHandler.js';


// GET all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// CREATE a new User
const createUsers = asyncHandler(async (req, res, next) => {
  const value = handleValidation(req.body, userValidationSchema, res, next);

  const existing = await User.findOne({ userId: value.userId });
  if (existing) {
    return next(new AppError(' User already exists', 409));
  }

  const habit = new User(value);
  await habit.save();

  res.status(201).json({ message: 'User created', habit });
  
});


//Update Users
const updateUsers = asyncHandler(async (req, res, next) => {
  const value = handleValidation(req.body, updateUserValidationSchema, res, next);
  const { id } = req.params;

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


export default {
  getUsers,
  createUsers,
  updateUsers,
};
