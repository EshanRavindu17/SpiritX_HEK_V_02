import express from "express";
import cors from "cors";
 import authRouter from "./routes/authRouter.js";
 import authTest from "./routes/authTest.js";
import adminRouter from "./routes/adminRouter.js";
import adminForgotPasswordRouter from "./routes/adminForgotPassowrdRouter.js";

import dotenv from "dotenv";
import { auth } from "./config/firebaseAdmin.js"; // dont remove this
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

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
