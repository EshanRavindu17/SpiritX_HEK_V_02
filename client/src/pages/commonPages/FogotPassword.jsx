import React, { useState } from 'react';
import { api } from '../../../axios';
import { firebaseAuth } from '../../../config/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import ForgetPasswordViewIMG from '../../assets/images/bat.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log("55555")
      const jwtToken = localStorage.getItem('token');
      const response = await api.post(
        '/forgot-password',
        { email },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      
      if (response.data.success) {
        try {
          await sendPasswordResetEmail(firebaseAuth, email);
          setMessage('Password reset email sent! Please check your inbox.');
        } catch (error) {
          console.error('Error sending password reset email:', error);
          setMessage('Error sending reset email. Please try again later.');
        }
      } else {
        setMessage('You do not have permission to reset the password.');
      }
    } catch (error) {
      console.error('Error verifying admin role:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center p-4 lg:p-8">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0">
  <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${ForgetPasswordViewIMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
  <div className="absolute inset-0 bg-black/50"></div>
</div>

      {/* Forgot Password Box */}
      <div className="relative w-full max-w-sm p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">FORGOT PASSWORD</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="EMAIL"
              required
            />
          </div>

          {message && (
            <div className={`mb-4 text-sm text-center ${message.includes('sent') ? 'text-green-400' : 'text-red-300'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={loading}
          >
            {loading ? 'SENDING...' : 'SEND RESET EMAIL'}
          </button>

          <p className="mt-4 text-center text-gray-300">
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-500 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
