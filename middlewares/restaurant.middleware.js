const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.restaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      status: 'active',
      id,
    },
    include: {
      model: Review,
    },
  });

  if (!restaurant) {
    next(new AppError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;
  next();
});

exports.ifExistRestaurantReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!review) {
    next(new AppError('Review not found', 404));
  }

  const restaurtant = await Restaurant.findOne({
    where: {
      status: 'active',
      id: review.restaurantId,
    },
  });

  if (!restaurtant) {
    next(
      new AppError(
        'the restaurant that belongs to that review was not found',
        404
      )
    );
  }

  req.review = review;
  next();
});
