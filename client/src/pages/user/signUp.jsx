import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { firebaseAuth, firestoreDB } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import SignupViewIMG from '../../assets/images/Leather2.jpg'; // Add the background image

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 lg:px-8">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${SignupViewIMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Signup Box */}
      <div className="relative w-full max-w-sm p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 sm:w-96 md:w-100 lg:w-1/3 xl:w-1/4">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">SIGN UP</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">Signup successful! Redirecting...</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-500 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
