import asyncHandler from 'express-async-handler';
import prisma from '../prisma.js';
import AppError from '../utils/appError.js';

const getBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await prisma.blog.findMany();

  res.status(200).json({
    status: 'success',
    data: blogs
  });
});

const getBlog = asyncHandler(async (req, res, next) => {
  const blog = await prisma.blog.findFirst({
    where: { id: parseInt(req.params.id) }
  });

  if (!blog) return next(new AppError('Blog not found', 404));

  res.status(200).json({
    status: 'success',
    data: blog
  });
});

const createBlog = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      author: {
        connect: { id: req.user.id }
      }
    }
  });

  res.status(201).json({
    status: 'success',
    data: blog
  });
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const blog = await prisma.blog.findFirst({
    where: { id: parseInt(req.params.id) }
  });

  if (!blog) return next(new AppError('Blog not found', 404));

  if (blog.userId !== req.user.id)
    return next(
      new AppError('You are not authorized to update this blog', 403)
    );

  await prisma.blog.update({
    where: { id: req.params.id },
    data: req.body
  });

  res.status(200).json({
    status: 'success',
    data: blog
  });
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const blog = await prisma.blog.findFirst({
    where: { id: req.params.id }
  });

  if (!blog) return next(new AppError('Blog not found', 404));

  if (blog.userId !== req.user.id)
    return next(
      new AppError('You are not authorized to delete this blog', 403)
    );

  await prisma.blog.delete({
    where: { id: parseInt(req.params.id) }
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export default { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
