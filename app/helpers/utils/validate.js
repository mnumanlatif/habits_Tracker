import { AppError } from "./errorHandler.js";

export const handleValidation = (data, schema) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  return value;
};