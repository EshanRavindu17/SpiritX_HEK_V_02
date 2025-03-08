import express from 'express';

import { getfilterplayers, getPlayers, submitTeam } from '../controllers/userController.js';

import {verifyUser} from '../middleware/verifyJWTMiddleware.js';
import { changePassword } from '../controllers/authController.js';
const user = express.Router();


user.post('/change-password', verifyUser, changePassword);

export default user;
import { getPlayers } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.get('/getplayers',getPlayers)
userRouter.get('/getfilterplayers',getfilterplayers)
userRouter.post('/submitteam',submitTeam)

export default userRouter;
