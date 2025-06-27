import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../helpers/generateTokens.js';
import { AppError } from '../helpers/utils/errorHandler.js';
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
     return next(new AppError('Invalid Credentials', 401));
}

  const accessToken = generateAccessToken(user);
  console.log()
  const refreshToken = generateRefreshToken(user);

//   res.cookie('accessToken', accessToken, {
//     httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 15 * 60 * 1000
//   });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ message: 'Logged in successfully' ,
    accessToken
  }
  );
};

export const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) 
        return res.sendStatus(403);
    const newAccessToken = generateAccessToken({ _id: decoded.userId });
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 15 * 60 * 1000
    });
    res.json({ message: 'Token refreshed' });
  });
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};
