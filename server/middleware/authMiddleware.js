import admin from 'firebase-admin';
import jwt from "jsonwebtoken";

// Verify email for password reset
const verifyEmailForReset = async (req, res) => {
    console.log("reset");
    const { email } = req.body;
    console.log("reset email:", email);

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        console.log("record:", userRecord.customClaims);

        // Check if user exists (customClaims might not be the best indicator)
        if (userRecord) {
            return res.status(200).json({ success: true, message: 'User verified' });
        } else {
            return res.status(403).json({ success: false, message: 'Access Denied: Not a user' });
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error verifying user', 
            error: error.message 
        });
    }
};

// Verify user and generate JWT
const verifyUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log("header:", req.headers);

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        // Verify Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // Fetch user data from Firestore
        const userDoc = await admin.firestore().collection("users").doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userData = userDoc.data();
        console.log("userData:", userData);

        // Ensure role and name exist with fallbacks
        const isAdmin = userData.isAdmin || false;
        const name = userData.name || "User";

        // Generate JWT
        const jwtToken = jwt.sign(
            { uid, role: isAdmin ? "admin" : "user", name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" } // Token expires in 7 days
        );
        console.log("jwtToken:", jwtToken);

        // Send response
        res.status(200).json({ 
            success: true,
            token: jwtToken,
            isAdmin: isAdmin ? true : false, // Could simplify to just isAdmin
            name,
            id: uid
        });

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ 
            success: false, 
            message: "Authentication failed", 
            error: error.message 
        });
    }
};

export { verifyEmailForReset, verifyUser }; // Export both functions