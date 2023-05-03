const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next(
      new AppError('You are not logged in!, Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      status: 'active',
      id: decoded.id,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.sessionUser = user;
  next();
});

exports.protectOwner = catchAsync(async (req, res, next) => {
  const { sessionUser, user, review, order } = req;

  if (user) {
    if (sessionUser.id !== user.id) {
      next(new AppError('you do not own this account', 401));
    }
  } else if (review) {
    if (sessionUser.id !== review.userId) {
      next(
        new AppError(
          'Only the user who made the order can only perform these operations',
          401
        )
      );
    }
  } else {
    if (sessionUser.id !== order.userId) {
      next(
        new AppError(
          'Only the user who made the order can only perform these operations',
          401
        )
      );
    }
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action!'),
        403
      );
    }
    next();
  };
};
