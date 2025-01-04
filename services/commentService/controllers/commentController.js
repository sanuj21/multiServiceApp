import asyncHandler from 'express-async-handler';
import prisma from '../prisma.js';
import AppError from '../utils/appError.js';

const createComment = asyncHandler(async (req, res, next) => {
  const { postId, content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      author: {
        connect: {
          id: req.user.id
        }
      },
      post: {
        connect: {
          id: postId
        }
      }
    }
  });

  if (!comment) {
    return next(new AppError('Something went wrong, comment not added!', 400));
  }

  res.status(201).json({
    status: 'success',
    data: {
      comment
    }
  });
});

const getCommentsByPostId = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const comments = await prisma.comment.findMany({
    where: {
      postId: parseInt(postId)
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      comments
    }
  });
});

export default { createComment, getCommentsByPostId };
