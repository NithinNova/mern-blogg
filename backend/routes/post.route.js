import express from 'express';
import jwt from 'jsonwebtoken';
import Post from '../models/post.model.js';

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
router.post('/', authenticateUser, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user.userId });
  await post.save();
  res.json(post);
});

// View All Posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find({ approved: true }).populate('author');
  res.json(posts);
});

// Edit Post (only by the author)
router.put('/:postId', authenticateUser, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post.author.toString() !== req.user.userId) return res.status(403).send('Not allowed');
  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.json(post);
});

// Delete Post
router.delete('/:postId', authenticateUser, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post.author.toString() !== req.user.userId) return res.status(403).send('Not allowed');
  await post.remove();
  res.send('Post deleted');
});

export default router;
