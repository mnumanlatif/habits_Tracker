import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/userModel.js'; // Assuming IUser is your User interface
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';
import { AppError } from '../utils/errorHandler.js';

export const authenticateUser = async (
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new AppError('Invalid Credentials', 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError('Invalid Credentials', 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  if (!refreshToken) {
    throw new AppError('No refresh token found', 401);
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { userId: string };

    const newAccessToken = generateAccessToken({ _id: decoded.userId });
    return newAccessToken;
  } catch (err) {
    throw new AppError('Invalid refresh token', 403);
  }
};
