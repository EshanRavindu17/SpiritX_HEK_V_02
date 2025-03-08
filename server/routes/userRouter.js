import express from 'express';
import { getPlayers } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/getplayers',getPlayers)

export default userRouter;