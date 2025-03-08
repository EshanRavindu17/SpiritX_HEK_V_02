import express from 'express';
import { getAllUsers } from "../controllers/testController.js";
import {verifyUser,verifyAdmin} from '../middleware/verifyJWTMiddleware.js';
const router = express.Router();
router.get("/test", verifyUser, verifyAdmin,getAllUsers);
export default router;
