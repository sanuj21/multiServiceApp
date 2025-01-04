import asyncHandler from 'express-async-handler';
import prisma from '../prisma.js';
import AppError from '../utils/appError.js';

const createComment = asyncHandler(async (req, res, next) => {
  const { postId, content } = req.body;

  const parentId = req.body.parentId;
  let comment;

  if (parentId) {
    // Check if the parent comment has the same post id

    const parentComment = await prisma.comment.findFirst({
      where: {
        id: parseInt(parentId),
        postId: parseInt(postId)
      }
    });

    if (!parentComment) {
      return next(new AppError('Parent comment not found', 404));
    }

    comment = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: parseInt(req.user.id)
          }
        },
        post: {
          connect: {
            id: parseInt(postId)
          }
        },
        parent: {
          connect: {
            id: parseInt(parentId)
          }
        }
      }
    });
  } else {
    comment = await prisma.comment.create({
      data: {
        content,
        author: {
          connect: {
            id: parseInt(req.user.id)
          }
        },
        post: {
          connect: {
            id: parseInt(postId)
          }
        }
      }
    });
  }

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
      postId: parseInt(postId),
      parentId: null
    },
    include: {
      children: {
        include: {
          children: true
        }
      }
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
