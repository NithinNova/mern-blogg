import Comment from '../models/Comment.js';

// Add Comment to Post
export async function addComment(req, res) {
  const { content, postId } = req.body;
  const comment = new Comment({ content, post: postId, author: req.user.userId });
  await comment.save();
  res.json(comment);
}

// Get Comments for Post
export async function getCommentsForPost(req, res) {
  const comments = await Comment.find({ post: req.params.postId }).populate('author');
  res.json(comments);
}
