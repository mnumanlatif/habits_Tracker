import Joi from 'joi';

export const updateUserValidationSchema = Joi.object({
  name: Joi.string().min(5).max(50),
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required(),
  age: Joi.number().min(18).max(50),
  department: Joi.string().allow('').optional(),
}).min(1); 