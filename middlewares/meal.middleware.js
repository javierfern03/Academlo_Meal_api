const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.oneMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id,
    },
    include: {
      model: Restaurant,
    },
  });

  if (!meal) {
    next(new AppError('Meal not found', 404));
  }

  req.oneMeal = meal;
  next();
});
