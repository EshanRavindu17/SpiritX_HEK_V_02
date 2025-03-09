import express from 'express';


import { getfilterplayers, getPlayers, getTeam, removePlayer, submitTeam } from '../controllers/userController.js';
import {verifyUser} from '../middleware/verifyJWTMiddleware.js';
import { changePassword } from '../controllers/authController.js';


const userRouter = express.Router();

userRouter.get('/getplayers',getPlayers)
userRouter.get('/getfilterplayers/:id',getfilterplayers)
userRouter.post('/submitteam',submitTeam)
userRouter.post('/change-password', verifyUser, changePassword);
userRouter.get('/getTeam/:id',getTeam)
userRouter.post('/removePlayer',removePlayer)


export default userRouter;
