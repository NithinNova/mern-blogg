import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PostList from './PostList';
import CreatePost from './CreatePost';
import ForgotPassword from './Forgotpassword';
import Login from './Login'; 
import AdminDashboard from './AdminDashboard';
import Register from './Register';  

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<PostList /> } />
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login /> } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create" element={<CreatePost /> } />
          <Route path="/admin" element={<AdminDashboard /> } />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
