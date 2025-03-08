import admin from 'firebase-admin';
export const sendAdminResetPasswordEmail = async (req, res) => {

    const { email } = req.body;
    console.log("reset email :",email)

  try {
     const userRecord = await admin.auth().getUserByEmail(email);
    if (userRecord) {
      return res.status(200).json({ success: true, message: 'sended reset password email' });
    } else {
      return res.status(403).json({ success: false, message: 'Access Denied: Not an admin' });
    }
  } catch (error) {
    console.error('Error verifying admin role:', error);
    return res.status(500).json({ success: false, message: 'Error verifying admin role' });
  }
};

