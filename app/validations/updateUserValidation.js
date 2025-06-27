import Joi from 'joi';

export const updateUserValidationSchema = Joi.object({
  name: Joi.string().min(5).max(50).optional(),
  email: Joi.string().optional().optional(),
  password: Joi.string().alphanum().min(8).optional(),
  age: Joi.number().min(18).max(50),
  department: Joi.string().allow('').optional(),
}).min(1); 