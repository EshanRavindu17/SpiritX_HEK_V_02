import express from "express";
import cors from "cors";
 import authRouter from "./routes/authRouter.js";
 import authTest from "./routes/authTest.js";
import adminRouter from "./routes/adminRouter.js";
import adminForgotPasswordRouter from "./routes/adminForgotPassowrdRouter.js";
import userRouter from "./routes/userRouter.js"
import dotenv from "dotenv";

import admin from 'firebase-admin';

import { auth } from "./config/firebaseAdmin.js"; // dont remove this
dotenv.config();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
//admin login
app.use("/api", adminForgotPasswordRouter);

 app.use("/api", authRouter);
// //admin email verify when fogot password
 app.use("/api", authTest);
// // admin change password
// app.use("/api/admin", adminRouter);

// app.use("/api", liveRouter);

app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name, // Optional: Set displayName in Auth
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
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
