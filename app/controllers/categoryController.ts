import mongoose from 'mongoose';
import { Response, Request, NextFunction } from 'express';
import { categoryValidationSchema } from '../validations/createCategoryValidation.js';
import { updateCategoryValidationSchema } from '../validations/updateCategoryValidation.js';
import { handleValidation } from '../utils/validate.js';
import asyncHandler from '../utils/asyncHandler.js';
import { AppError } from '../utils/errorHandler.js';
import {
  getAllCategories,
  isCategoryDuplicate,
  createCategory,
  updateCategoryById,
} from '../services/categoryService.js';

const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await getAllCategories();
  res.status(200).json(categories);
});

const createCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const value = handleValidation(req.body, categoryValidationSchema);

  const duplicate = await isCategoryDuplicate(value);
  if (duplicate) {
    return next(new AppError('Category already exists', 409));
  }

  const category = await createCategory(value);
  res.status(201).json({ message: 'Category created', category });
});

const updateCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId(id)) {
    return next(new AppError('Invalid category ID format', 400));
  }

  const value = handleValidation(req.body, updateCategoryValidationSchema);

  const updatedCategory = await updateCategoryById(id, value);
  res.status(200).json({ message: 'Category Data updated', category: updatedCategory });
});

export default {
  getCategories,
  createCategories,
  updateCategories,
};
