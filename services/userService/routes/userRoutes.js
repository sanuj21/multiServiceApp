import express from 'express';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post(
  '/users/verify-user',
  authMiddleware.protect,
  authController.verifyUser
);

router.use(authMiddleware.protect);
router
  .route('/users/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
