
import admin from 'firebase-admin';
import jwt from "jsonwebtoken";


const verifyEmailForReset = async (req, res) => {
    console.log("reset")

    const { email } = req.body;
    console.log("reset email :",email)

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    console.log("record :",userRecord.customClaims)
    if (userRecord.customClaims) {
      return res.status(200).json({ success: true, message: 'user verified' });
    } else {
      return res.status(403).json({ success: false, message: 'Access Denied: Not a user' });
    }
  } catch (error) {
    console.error('Error verifying admin role:', error);
    return res.status(500).json({ success: false, message: 'Error verifying admin role' });
  }
};

const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log("header :",req.headers)
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
  
    try {

        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
    
        // 🔍 Fetch user role & name from Firestore
        const userDoc = await admin.firestore().collection("users").doc(uid).get();
        if (!userDoc.exists) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const userData = userDoc.data();
        console.log("userData ;",userData)

        const isAdmin = userData.isAdmin || false; // Ensure it exists
        const name = userData.name || "User";      // Ensure name exists
    
        // 🔐 Generate a JWT for future authentication
        const jwtToken = jwt.sign(
          { uid, role: isAdmin ? "admin" : "user", name },
          process.env.JWT_SECRET,
          { expiresIn: "7d" } // Token expires in 7 days
        );
    console.log("jwtToken :",jwtToken)
        // ✅ Send response with role, name & JWT
        res.json({ 
          token: jwtToken,
          isAdmin: isAdmin ? true : false,
          name 
        });
    
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ success: false, message: "You can't access" });
    }
};

export default verifyUser;
