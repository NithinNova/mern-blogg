import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// Approve Post
export const approvePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.approved = true;
  await post.save();
  res.send('Post approved');
};

// Delete Post
export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.postId);
  res.send('Post deleted');
};

// Delete Comment
export const deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.send('Comment deleted');
};
