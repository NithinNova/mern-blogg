import express from 'express';
import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Authenticate Admin Middleware
function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    if (decoded.role !== 'admin') return res.status(403).send('Admins only');
    req.user = decoded;
    next();
  });
}

// Approve Post
router.put('/approve/:postId', authenticateAdmin, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.approved = true;
  await post.save();
  res.send('Post approved');
});

// Delete Post
router.delete('/delete/:postId', authenticateAdmin, async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId);
  res.send('Post deleted');
});

// Delete Comment
router.delete('/comment/:commentId', authenticateAdmin, async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.send('Comment deleted');
});

export default router;
