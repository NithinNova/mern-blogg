import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Retrieve the token from localStorage (Ensure the key matches what you used when storing)
    const token = localStorage.getItem('authToken');  // Use 'authToken' instead of 'token'
    console.log('Retrieved token from localStorage:', token);

    if (!token) {
      alert('Please log in to create a post');
      return;
    }

    // Fetch request to create a post
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use the retrieved token here
        },
        body: JSON.stringify({ title, content }),
      });

      // Handle response
      if (response.ok) {
        console.log('Post created successfully');
        navigate('/'); // Navigate after successful post creation
      } else {
        const errorData = await response.json();
        console.error('Failed to create post:', errorData.message);
        alert('Failed to create post: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error while creating post:', error);
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleCreatePost} className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Blog-Create a Post</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Post title"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Post content"
          />
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost; // Use ES module export
