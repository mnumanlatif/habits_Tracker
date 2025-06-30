import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';
import { AppError } from '../utils/errorHandler.js';

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Invalid Credentials', 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    if (!refreshToken) {
      return reject(new AppError('No refresh token found', 401));
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return reject(new AppError('Invalid refresh token', 403));
      const newAccessToken = generateAccessToken({ _id: decoded.userId });
      resolve(newAccessToken);
    });
  });
};
