import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables
export const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 

    console.log("verify user :",token)
    console.log("verify+++ :",req.headers)

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach decoded user info to the request
    next(); // Continue to the next middleware
  } catch (error) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// ✅ Middleware to check if the user is an Admin
export const verifyAdmin = (req, res, next) => {

  if (!req.user || req.user.isAdmin === false) {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
  next();
};

