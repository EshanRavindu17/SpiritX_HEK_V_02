import express from 'express';
import { getfilterplayers, getPlayers, submitTeam } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/getplayers',getPlayers)
userRouter.get('/getfilterplayers',getfilterplayers)
userRouter.post('/submitteam',submitTeam)

export default userRouter;