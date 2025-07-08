import jwt, { Secret, SignOptions } from 'jsonwebtoken';

type Expiry = Exclude<SignOptions['expiresIn'], number | undefined>
interface User {
  _id: string;
}

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as Secret;

if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are not set in environment variables');
}

const ACCESS_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '15m') as Expiry;
const REFRESH_EXPIRES_IN= (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as Expiry;

export const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { userId: user._id },
    JWT_SECRET ,
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
