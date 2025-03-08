import express from "express";
import cors from "cors";
// import authRouter from "./routes/authRouter.js";
// import verifyAdminRole from "./routes/verifyAdminEmailRouter.js";
// import adminRouter from "./routes/adminRouter.js";
// import liveRouter from "./routes/liveRouter.js";
import adminRouter from "./routes/adminRouter.js";

import dotenv from "dotenv";
import { auth } from "./config/firebaseAdmin.js"; // dont remove this
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//admin login
// app.use("/api", authRouter);
// //admin email verify when fogot password
// app.use("/api", verifyAdminRole);
// // admin change password
// app.use("/api/admin", adminRouter);

// app.use("/api", liveRouter);

app.use('/api/admin',adminRouter)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
