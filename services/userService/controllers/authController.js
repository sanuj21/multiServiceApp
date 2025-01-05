import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import prisma from '../prisma.js';
import bcrypt from 'bcryptjs';

/**
 * @desc  Function to create and send token to the user
 */
const createSendToken = (user, statusCode, res, next, msg) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_VALIDITY
  });

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  });

  res.status(200).json({
    status: 'success',
    message: msg,
    token
  });
};

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const role = req.body.role?.toUpperCase() || 'USER';

  const user = await prisma.user.findFirst({
    where: { email }
  });

  if (user) {
    return next(new AppError('Email Already Exist!! Please login', 400));
  }

  if (!name || !email || !password || !confirmPassword) {
    return next(new AppError('Please provide all the required fields', 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match', 400));
  }

  if (password.length < 8) {
    return next(
      new AppError('Password must be at least 8 characters long', 400)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role
    }
  });

  createSendToken(newUser, 200, res, next, 'User registered successfully');
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide email and password'));

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) return next(new AppError('Incorrect email or password', 401));

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordCorrect)
    return next(new AppError('Incorrect email or password', 401));

  createSendToken(user, 200, res, next, 'User logged in successfully');
});

// Route when users clicks on logout
const logout = (req, res, next) => {
  res.cookie('jwt', undefined, {
    expires: new Date(Date.now() + 10 * 1000)
  });
  res.status(200).json({
    status: 'success'
  });
};

const verifyUser = asyncHandler(async (req, res, next) => {
  if (!req.user) return next(new AppError('User not found', 404));

  res.status(200).json({
    status: 'success',
    user: req.user
  });
});

export default { register, login, logout, verifyUser };
