const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});
