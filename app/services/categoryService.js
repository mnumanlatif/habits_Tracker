import Category from '../models/categoryModel.js';
import { AppError } from '../utils/errorHandler.js';

export const getAllCategories = async () => {
  return await Category.find();
};

export const isCategoryDuplicate = async ({ categoryName, categoryId }) => {
  const existing = await Category.findOne({ categoryName, categoryId });
  return !!existing;
};

export const createCategory = async (data) => {
  const newCategory = new Category(data);
  return await newCategory.save();
};

export const updateCategoryById = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true }
  );
  if (!category) throw new AppError('Category not found', 404);
  return category;
};
