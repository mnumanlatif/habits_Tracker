import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  userName: Joi.string().min(5).max(50).required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required(),
  age: Joi.number().min(18).max(50).required(),
  department: Joi.string().required(),
});