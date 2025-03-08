import admin from 'firebase-admin';


const verifyAdminEmail = async (req, res) => {
    console.log("reset")

    const { email } = req.body;
    console.log("reset email :",email)

  try {
    const userRecord = await admin.auth().getUserByEmail(email);

    // Check if user has 'isAdmin' custom claim
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

export default verifyAdminEmail;
