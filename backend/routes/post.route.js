import express from 'express';
import jwt from 'jsonwebtoken';
import { createPost, getPosts, editPost, deletePost } from '../controllers/post.controller.js';

const router = express.Router();

// Authenticate User Middleware
function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
}

// Create Post
router.post('/', authenticateUser, createPost);

// View All Posts
router.get('/', getPosts);

// Edit Post (only by the author)
router.put('/:postId', authenticateUser, editPost);

// Delete Post
router.delete('/:postId', authenticateUser, deletePost);

export default router;