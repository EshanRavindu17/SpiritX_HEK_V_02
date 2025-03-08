import express from 'express';
import { getAdminDashboard } from "../controllers/authController.js";
import verifyUser from '../middleware/authMiddleware.js';

const router = express.Router();
router.post("/login", verifyUser, getAdminDashboard);
export default router;
