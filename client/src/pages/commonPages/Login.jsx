import React, { useState } from 'react';
import { api } from '../../../axios.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { firebaseAuth } from '../../../config/firebaseConfig.js';
import { useNavigate, Link } from 'react-router-dom';
import Mali from "../../assets/images//Leather.jpg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); 

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const response = await api.post(
        "/login", 
        {}, 
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      const data = response.data;
      console.log("Login Successful:", data);

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);
  
        navigate(data.isAdmin ? "/admin-panel" : "/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.code === "auth/invalid-credential" ? 
        "Incorrect email or password. Please try again." : 
        "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center p-4 lg:p-8">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Mali})` }}
        />
        {/* Opacity Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Login Box */}
      <div className="relative w-full max-w-sm p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">WELCOME</h2>
        <form>
          <div className="mb-6">
            <input 
              type="email" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="USERNAME"
            />
          </div>

          <div className="mb-6">
            <input 
              type="password" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="PASSWORD"
            />
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-300 text-sm text-center">{errorMessage}</div>
          )}

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-gray-300">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-blue-600"
              />
              REMEMBER ME
            </label>
            <Link to="/forgot-password" className="text-gray-300 hover:text-white">
              FORGOT PASSWORD?
            </Link>
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={(e) => { 
              e.preventDefault();
              login(email, password);
            }}
          >
            LOGIN
          </button>

          {/* Signup Link */}
          <p className="mt-4 text-center text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-500 font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
