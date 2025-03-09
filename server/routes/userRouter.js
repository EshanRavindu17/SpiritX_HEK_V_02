import express from 'express';
import {verifyUser} from '../middleware/verifyJWTMiddleware.js';
import { changePassword } from '../controllers/authController.js';
import { getPlayers } from '../controllers/userController.js';
import { clearTeam, getfilterplayers, getLeaderboard, getPlayers, getTeam, removePlayer, submitTeam } from '../controllers/userController.js';
import {verifyUser} from '../middleware/verifyJWTMiddleware.js';
import { changePassword } from '../controllers/authController.js';

const userRouter = express.Router();

console.log("uuuuu")
userRouter.post('/change-password', verifyUser, changePassword);
userRouter.get('/getplayers',getPlayers)
userRouter.get('/getfilterplayers/:id',getfilterplayers)
userRouter.post('/submitteam',submitTeam)
userRouter.post('/change-password', verifyUser, changePassword);
userRouter.get('/getTeam/:id',getTeam)
userRouter.post('/removePlayer',removePlayer)
userRouter.get('/getLeaderboard',getLeaderboard)
userRouter.post('/clearteam',clearTeam)






export default userRouter;
