import express from 'express';
import { addPlayer, deletePlayer, getPlayer, getPlayers, getTournamentSummary, updatePlayer } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/addplayer', addPlayer)
adminRouter.get('/getplayers', getPlayers)
adminRouter.get('/getplayer/:id', getPlayer)
adminRouter.put('/editplayer/:id', updatePlayer)
adminRouter.delete('/deleteplayer/:id', deletePlayer)
adminRouter.get('/tournament-summary',getTournamentSummary)

export default adminRouter;