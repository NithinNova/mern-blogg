import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/admin/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const approvePost = async (postId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/admin/approve/${postId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(posts.filter(post => post._id !== postId));
  };

  const deletePost = async (postId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/admin/delete/${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(posts.filter(post => post._id !== postId));
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog-Admin Dashboard</h1>
      {posts.length === 0 ? (
        <p className="text-center">No posts pending approval</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
              <div className="flex mt-4 space-x-2">
                <button onClick={() => approvePost(post._id)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                  Approve
                </button>
                <button onClick={() => deletePost(post._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; // Use ES module export
