import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import prisma from '../prisma.js';

const getUser = asyncHandler(async (req, res, next) => {
  if (req.user.role.toLowerCase() !== 'admin') {
    return next(
      new AppError('You are not authorized to perform this action', 403)
    );
  }

  const user = await prisma.user.findFirst({
    where: { id: parseInt(req.params.id) }
  });

  const posts = await prisma.blog.findMany();

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    data: user
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.user.role.toLowerCase() !== 'admin') {
    return next(
      new AppError('You are not authorized to perform this action', 403)
    );
  }

  const user = await prisma.user.findFirst({
    where: { id: req.params.id }
  });

  if (!user) return next(new AppError('User not found', 404));

  await prisma.user.delete({
    where: { id: parseInt(req.params.id) }
  });

  res.status(204).json({
    status: 'success',
    message: 'User deleted successfully',
    data: null
  });
});

const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.role.toLowerCase() !== 'admin') {
    return next(
      new AppError('You are not authorized to perform this action', 403)
    );
  }

  const user = await prisma.user.findFirst({
    where: { id: parseInt(req.params.id) }
  });

  if (!user) return next(new AppError('User not found', 404));

  await prisma.user.update({
    where: { id: req.params.id },
    data: req.body
  });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: user
  });
});

export default { getUser, deleteUser, updateUser };
