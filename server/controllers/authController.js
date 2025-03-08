export const getAdminDashboard = (req, res) => {
    try {
        res.json({ success: true, message: "Welcome Admin!", adminData: req.user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
