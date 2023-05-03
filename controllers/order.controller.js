const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.orderCreate = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id: mealId,
    },
  });

  if (!meal) {
    next(new AppError('The meal not found', 404));
  }

  const totalPrice = meal.price * quantity;

  const order = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  res.status(200).json({
    status: 'success',
    message: 'The order has been created successfully',
    order,
  });
});

exports.orderGetMyAll = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      status: 'active',
      userId: sessionUser.id,
    },
    include: [
      {
        model: Meal,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Restaurant,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'active',
    message: 'The query has been successfully',
    orders,
  });
});

exports.orderUpdate = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'success',
    message: 'The order has been updated successfully',
  });
});

exports.orderDelete = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The order has been updated successfully',
  });
});
