import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import prisma from '../prisma.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc  Function to protect routes from unauthorized access
 */

const verifyUser = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers?.authorization &&
    req.headers?.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies?.jwt;
  }

  if (!token)
    return next(
      new AppError('User is not logged in! Please login to get access', 401)
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await prisma.user.findFirst({
    where: { id: decoded.id }
  });

  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token do not exist now', 400)
    );
  }

  res.status(200).json({
    status: 'success',
    user: currentUser
  });
});

export default { verifyUser };
