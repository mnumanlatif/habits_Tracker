import jwt from 'jsonwebtoken';
import { AppError } from '../helpers/utils/errorHandler.js'; // If you're using a custom error handler

export const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Bearer token is required', 401));
  }

  const token = authHeader.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError('Token expired or invalid', 403));
    }

    req.user = decoded;
    next();
  });
};
