
import admin from 'firebase-admin';

const setAdminRole = async (uid) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
        console.log('Admin role set for user:', uid);
    } catch (error) {
        console.error('Error setting admin role:', error);
    }
};

const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
  
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        const userDoc = await admin.firestore().collection('users').doc(uid).get();

        if (decodedToken.isAdmin) {
            if (userDoc.exists) {
                req.user = userDoc.data();
                return next();
            }
        }


        if (userDoc.exists && userDoc.data().isAdmin === true) {
            await setAdminRole(uid);

            return res.status(403).json({
                success: false,
                message: "Admin role updated. Please refresh your token and try again.",
            });
        }

        return res.status(403).json({ success: false, message: "Access denied: Not an admin" });

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ success: false, message: "You can't access" });
    }
};

export default verifyUser;
