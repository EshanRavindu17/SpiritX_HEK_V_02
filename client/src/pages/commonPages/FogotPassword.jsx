import React, { useState } from 'react';
import { api } from '../../../axios'; // Import your API instance for backend communication
import { firebaseAuth } from '../../../config/firebaseConfig'; // Import Firebase config
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await api.post('/verify-user-role', { email });

      if (response.data.success) {
        try {
          await sendPasswordResetEmail(firebaseAuth, email);
          setMessage('Password reset email sent! Please check your inbox.');
        } catch (error) {
          console.error("Error sending password reset email:", error);
          setMessage('Error sending reset email. Please try again later.');
        }
      } else {
        setMessage('You do not have permission to reset the password.');
      }
    } catch (error) {
      console.error("Error verifying admin role:", error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Forgot Password</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Display success or error message */}
          {message && (
            <div className={`mb-4 text-sm text-center ${message.includes('sent') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
