import express from 'express';
import { addComment, getCommentsForPost } from '../controllers/commentController.js';
import authenticateUser from '../middlewares/authMiddleware.js'; // Ensure this middleware uses ES module syntax

const router = express.Router();

router.post('/:postId', authenticateUser, addComment);
router.get('/:postId', getCommentsForPost);

export default router;
