const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJwt = require('../utils/jwt');
const AppError = require('../utils/appError');
const Order = require('../models/orders.model');
const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');

exports.userSignup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password.trim(), salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJwt(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been signup succesfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      status: 'active',
      email: email.toLowerCase().trim(),
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!(await bcrypt.compare(password.trim(), user.password))) {
    return next(new AppError('The password or email is incorrect', 401));
  }

  const token = await generateJwt(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been login succesfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.userUpdate = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been updated succesfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.userDelete = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: 'desabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been delete succesfully',
  });
});

exports.userOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      status: 'active',
      userId: sessionUser.id,
    },
    include: [
      {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        model: Meal,
        include: [
          {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            model: Restaurant,
          },
        ],
      },
    ],
  });

  if (!orders) {
    return next(new AppError('Not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'The query has been succesfully',
    orders,
  });
});

exports.userOneOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
      userId: sessionUser.id,
    },
    include: [
      {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        model: Meal,
        include: [
          {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            model: Restaurant,
          },
        ],
      },
    ],
  });

  if (!order) {
    return next(new AppError('order not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'The query has been succesfully',
    order,
  });
});
