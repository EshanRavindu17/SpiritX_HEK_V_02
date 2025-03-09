import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables
export const verifyUser = (req, res, next) => {
console.log("userrrrrrr")
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log("token :",token)

   
    if (!token) {

      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded :",decoded)

    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// ✅ Middleware to check if the user is an Admin
export const verifyAdmin = (req, res, next) => {
  console.log("Checking Admin Role:", req.user);

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  next();
};

