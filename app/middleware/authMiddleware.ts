import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler.js';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Bearer token is required', 401));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err: Error | null, decoded: any) => {
    if (err) {
      return next(new AppError('Token expired or invalid', 403));
    }

    req.user = decoded;
    next();
  });
};
