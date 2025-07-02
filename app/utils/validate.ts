import { AppError } from './errorHandler.js';
import Joi from 'joi'; 

export const handleValidation = (
  data: any,
  schema: Joi.ObjectSchema
): any => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  return value;
};
