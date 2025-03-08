import admin from "firebase-admin";

// Reference to Firestore database

/**
 * Get all users from Firestore
 */
export const getAllUsers = async (req, res) => {
  try {
    // Reference to "users" collection
    const usersSnapshot = await admin.firestore().collection("users").get();

    // Convert snapshot to array of user objects
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
