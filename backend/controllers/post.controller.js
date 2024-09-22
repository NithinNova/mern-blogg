import Post from '../models/Post.js';

// Create Post
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user.userId });
  await post.save();
  res.json(post);
};

// View All Posts
export const getPosts = async (req, res) => {
  const posts = await Post.find({ approved: true }).populate('author');
  res.json(posts);
};

// Edit Post
export const editPost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post.author.toString() !== req.user.userId) {
    return res.status(403).send('Not allowed');
  }
  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.json(post);
};

// Delete Post
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post.author.toString() !== req.user.userId) {
    return res.status(403).send('Not allowed');
  }
  await post.remove();
  res.send('Post deleted');
};
