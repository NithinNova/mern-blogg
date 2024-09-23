import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");

        // Log response status and headers to check for issues
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const data = await response.json();

        // Log the data received from the backend
        console.log("Fetched posts:", data);

        setPosts(data);
        navigate("/");
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleCreatePost = () => {
    navigate("/create");
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog-All Posts</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
              
      </div>
      {posts.length === 0 ? (
        <p className="text-center">No posts available</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By: {post.author.username}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostList;
