import express from 'express';
import {sendAdminResetPasswordEmail} from "../controllers/fogotPasswordController.js";
import {verifyUser,verifyAdmin} from '../middleware/verifyJWTMiddleware.js';
const adminForgotPassowrdRouter = express.Router();
console.log("here")
adminForgotPassowrdRouter.post("/forgot-password", verifyUser,sendAdminResetPasswordEmail);
export default adminForgotPassowrdRouter;

