import express from 'express';
import { addPlayer, deletePlayer, getPlayer, getPlayers, getTournamentSummary, updatePlayer } from '../controllers/adminController.js';
import {verifyUser,verifyAdmin} from '../middleware/verifyJWTMiddleware.js';
import { changePassword } from '../controllers/authController.js';
import { resetLimiter } from "../middleware/rateLimiter.js";
import { sendAdminPasswordResetLink, resetAdminPassword } from "../controllers/adminController.js";
const adminRouter = express.Router();
console.log("aaa")
adminRouter.post('/addplayer', addPlayer)
adminRouter.get('/getplayers', getPlayers)
adminRouter.get('/getplayer/:id', getPlayer)
adminRouter.put('/editplayer/:id', updatePlayer)
adminRouter.delete('/deleteplayer/:id', deletePlayer)
adminRouter.get('/tournament-summary',getTournamentSummary)
adminRouter.get('/change-password',changePassword)
adminRouter.post('/change-password', verifyUser,verifyAdmin, changePassword);
adminRouter.post("/send-password-reset",verifyUser,verifyAdmin, sendAdminPasswordResetLink);
adminRouter.post("/reset-password",verifyUser,verifyAdmin, resetAdminPassword); // No limiter needed here
export default adminRouter;