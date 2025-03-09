// server/middleware/validateSignup.js
const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;
  
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
  
    // Optional: Additional validation (e.g., email format, password strength)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
  
    next(); // Proceed to the route handler if validation passes
  };
  
export default validateSignup