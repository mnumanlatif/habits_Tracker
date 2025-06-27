import express from 'express';
import { login, refreshToken, logout } from '../app/controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
