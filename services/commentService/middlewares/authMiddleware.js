import AppError from '../utils/appError.js';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

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

  const apiRes = await axios({
    method: 'POST',
    url: 'http://user-service:3000/users/verify-user',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (apiRes.status != 200) {
    return next(new AppError('Something went wrong', res.data.statusCode));
  }

  console.log(apiRes.data);

  req.user = apiRes.data.user;

  next();
});

export default { protect };
