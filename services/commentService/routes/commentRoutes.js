import express from 'express';
import commentController from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', commentController.createComment);
router.get('/:postId', commentController.getCommentsByPostId);

export default router;
