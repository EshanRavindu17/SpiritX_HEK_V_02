import express from 'express';
import { getAdminDashboard } from "../controllers/authController.js";
import {verifyUser} from '../middleware/authMiddleware.js';
import validateSignup from '../middleware/validateSignUp.js';
const router = express.Router();
router.post("/login", verifyUser, getAdminDashboard);
router.get("/getplayers")
export default router;
// Signup route
router.post('/signup', validateSignup, async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Create user in Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name,
      });
  
      // Store additional user data in Firestore
      await admin.firestore().collection('users').doc(userRecord.uid).set({
        name,
        email,
        uid: userRecord.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      // Send success response
      res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
      console.error('Signup error:', error);
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-exists') {
        res.status(400).json({ error: 'Email already in use' });
      } else if (error.code === 'auth/invalid-email') {
        res.status(400).json({ error: 'Invalid email format' });
      } else if (error.code === 'auth/weak-password') {
        res.status(400).json({ error: 'Password must be at least 6 characters' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });