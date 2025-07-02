import { userValidationSchema } from '../validations/createUserValidation.js';
import { updateUserValidationSchema } from '../validations/updateUserValidation.js';
import { handleValidation } from '../utils/validate.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Response, Request, NextFunction } from 'express';
import {
  getAllUsers,
  checkUserExists,
  createUser,
  updateUserById,
  deleteUserById
} from '../services/userService.js';

const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

const createUsers = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const value = handleValidation(req.body, userValidationSchema);
  await checkUserExists({ userName: value.userName, email: value.email });
  const user = await createUser(value);
  res.status(201).json({ message: 'User created', user });
});

const updateUsers = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const value = handleValidation(req.body, updateUserValidationSchema);
  const updatedUser = await updateUserById(req.params.id, value);
  res.status(200).json({ message: 'User Data updated', user: updatedUser });
});

const deleteUsers = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  await deleteUserById(req.params.id);
  res.status(200).json({ message: 'User and related habits deleted successfully' });
});

export default {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
