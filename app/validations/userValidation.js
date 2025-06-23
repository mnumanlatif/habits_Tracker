import Joi from 'joi';

export const userValidationSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().min(5).max(50).required(),
  age: Joi.number().min(18).max(50).required(),
  department: Joi.string().allow('').optional(),
});
