import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);

        const token = response.data.token;
        localStorage.setItem('authToken', token);

        navigate('/create');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Invalid username or password. Please try again.'); 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Blog - Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your password"
          />
          {errorMessage && ( 
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4">
          Login
        </button>
        
        <div className="text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
