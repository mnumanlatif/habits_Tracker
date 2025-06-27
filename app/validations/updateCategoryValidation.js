import Joi from 'joi';

export const updateCategoryValidationSchema = Joi.object({
  categoryName: Joi.string().min(5).max(50).required(),
  description: Joi.string().allow('').optional(),
}).min(1);
