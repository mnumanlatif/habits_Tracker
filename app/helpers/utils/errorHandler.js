// utils/errorHandler.js
import logger from './logger.js';

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // this is OK
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status, 
      message: err.message,
    });
  }

  // Log unexpected errors
  logger.error(`[UNEXPECTED ERROR]: ${err.message}`, { stack: err.stack });

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};


export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  handleError(err, res);
};