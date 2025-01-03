import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import prisma from '../prisma.js';
import asyncHandler from 'express-async-handler';

/**
 * @desc  Function to protect routes from unauthorized access
 */
const protect = asyncHandler(async (req, res, next) => {
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

  req.user = currentUser;
  next();
});

export default protect;
