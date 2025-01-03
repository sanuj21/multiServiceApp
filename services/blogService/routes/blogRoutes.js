import express from 'express';
import blogController from '../controllers/blogController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(blogController.getBlogs)
  .post(authMiddleware.protect, blogController.createBlog);

router
  .route('/:id')
  .get(blogController.getBlog)
  .put(authMiddleware.protect, blogController.updateBlog)
  .delete(authMiddleware.protect, blogController.deleteBlog);

export default router;
