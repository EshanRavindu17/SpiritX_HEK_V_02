import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { api } from '../../../axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    
    try {
      const jwtToken = localStorage.getItem("token"); 

    const response = await api.post("/admin/send-password-reset", 
      { email }, 
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

      if (response.data.success) {
        setSuccessMessage('Reset link and code sent to your email.');
        setTimeout(() => navigate('/reset-password'), 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Reset Your Password</h2>
        <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center mt-4">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="text-green-500 text-sm text-center mt-4">
              {successMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword