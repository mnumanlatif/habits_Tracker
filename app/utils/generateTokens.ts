import jwt, { Secret, SignOptions } from 'jsonwebtoken';

interface User {
  _id: string;
}

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as Secret;

if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are not set in environment variables');
}

// Cast to any to bypass strict union mismatch
const ACCESS_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '15m') as any;
const REFRESH_EXPIRES_IN = (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as any;

export const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
};

export const generateRefreshToken = (user: User): string => {
  return jwt.sign(
    { userId: user._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN }
  );
};
