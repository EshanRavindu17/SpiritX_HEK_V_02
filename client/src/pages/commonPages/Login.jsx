import React, { useState } from 'react';
import { api } from '../../../axios.js';
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail} from "firebase/auth"; 
import { firebaseAuth } from '../../../config/firebaseConfig.js';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const login = async (email, password) => {
    try {
     
  
      // 🔐 Sign in user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
  
      // 🔒 Send token to backend
      const response = await api.post(
        "/login", 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
  
      const data = response.data;
      console.log("Login Successful:", data);
  
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id",data.id)
  
        navigate(data.isAdmin ? "/admin-panel" : "/");


      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("Incorrect email or password Please try again.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
            />
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={(e) => { 
              e.preventDefault();
              login(email, password);
            }}
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
