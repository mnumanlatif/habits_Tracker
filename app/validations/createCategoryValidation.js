import Joi from 'joi';

export const categoryValidationSchema = Joi.object({
  categoryName: Joi.string().min(5).max(50).required(),
  description: Joi.string().allow('').optional(),
});
