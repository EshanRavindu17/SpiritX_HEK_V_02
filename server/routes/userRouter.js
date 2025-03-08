import express from 'express';
import {verifyUser} from '../middleware/verifyJWTMiddleware.js';
import { changePassword } from '../controllers/authController.js';
const user = express.Router();


user.post('/change-password', verifyUser, changePassword);

export default user;