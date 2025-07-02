import Category from '../models/categoryModel.js';
import { AppError } from '../utils/errorHandler.js';

interface CategoryData {
  categoryName: string;
  categoryId?: string;  // if optional, else remove ?
  // add other properties if needed
}

export const getAllCategories = async () => {
  return await Category.find();
};

// Destructured parameter typed as CategoryData
export const isCategoryDuplicate = async ({ categoryName, categoryId }: CategoryData): Promise<boolean> => {
  const existing = await Category.findOne({ categoryName, categoryId });
  return !!existing;
};

// Parameter typed as CategoryData or partial
export const createCategory = async (data: CategoryData) => {
  const newCategory = new Category(data);
  return await newCategory.save();
};

export const updateCategoryById = async (id: string, updateData: Partial<CategoryData>) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true }
  );
  if (!category) throw new AppError('Category not found', 404);
  return category;
};
