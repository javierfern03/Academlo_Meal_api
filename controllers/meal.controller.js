const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const catchAsync = require('../utils/catchAsync');

exports.mealCreate = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const meal = await Meal.create({
    name: name.trim(),
    price: price.trim(),
    restaurantId: id,
  });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been created successfully',
    meal,
  });
});

exports.mealsGetAll = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: {
      model: Restaurant,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been successfully',
    result: meals.length,
    meals,
  });
});

exports.mealGetOne = catchAsync(async (req, res, next) => {
  const { oneMeal } = req;

  res.status(200).json({
    status: 'success',
    message: 'The query has been successfully',
    meal: oneMeal,
  });
});

exports.mealUpdate = catchAsync(async (req, res, next) => {
  const { oneMeal } = req;
  const { name, price } = req.body;

  await oneMeal.update({
    name: name.trim(),
    price: price.trim(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been updated successfully',
    meal: oneMeal,
  });
});

exports.mealDelete = catchAsync(async (req, res, next) => {
  const { oneMeal } = req;

  await oneMeal.update({
    status: 'desabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been deleted successfully',
  });
});
