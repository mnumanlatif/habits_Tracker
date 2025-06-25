import { categoryValidationSchema } from '../validations/createCategoryValidation.js';
import { updateCategoryValidationSchema } from '../validations/updateCategoryValidation.js';
import { handleValidation } from '../helpers/utils/validate.js';
import asyncHandler from '../helpers/utils/asyncHandler.js';
import { AppError } from '../helpers/utils/errorHandler.js';
import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';


const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

const createCategories = asyncHandler(async (req, res, next) => {
  const value = handleValidation(req.body, categoryValidationSchema);

  try {
    // Ensure uniqueness per user
    const existingCategory = await Category.findOne({
      categoryName: value.categoryName,
      categoryId: value.categoryId,
    });

    if (existingCategory) {
      return next(new AppError('Category already exists', 409));
    }

    const category = new Category(value);
    await category.save();

    res.status(201).json({ message: 'Category created', category });

  } catch (err) {
    return next(err);
  }
});



const updateCategories = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid category ID format', 400));
  }

  const value = handleValidation(req.body, updateCategoryValidationSchema, res, next);

  const category = await Category.findByIdAndUpdate(
    id,
    { ...value, updatedAt: new Date() },
    { new: true }
  );

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({ message: 'Category Data updated', category });
});


export default {
  getCategories,
  createCategories,
  updateCategories,
};