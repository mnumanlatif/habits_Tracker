import { AppError } from './errorHandler.js';
import Joi from 'joi'; 

export const handleValidation = <T> (
  data: unknown,
  schema: Joi.ObjectSchema<T>
): T => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  return value;
};
