import express from 'express';
import {verifyUser} from '../middleware/verifyJWTMiddleware.js';
import { changePassword } from '../controllers/authController.js';
import { getPlayers } from '../controllers/userController.js';

const userRouter = express.Router();

console.log("uuuuu")
userRouter.post('/change-password', verifyUser, changePassword);



userRouter.get('/getplayers',getPlayers)






export default userRouter;
