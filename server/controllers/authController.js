export const getAdminDashboard = (req, res) => {
    try {
        res.json({ success: true, message: "Welcome Admin!", adminData: req.user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { uid } = req.user; 
    try {
  
      await admin.auth().updateUser(uid, {
        password: newPassword,
      });
  
      res.status(200).json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(400).json({ success: false, message: 'Failed to change password.' });
    }
  };

