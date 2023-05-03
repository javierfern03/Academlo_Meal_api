const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.restaurantCreate = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name: name.trim(),
    address: address.trim(),
    rating: rating.trim(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been created successfully',
    restaurant,
  });
});

exports.restaurantsGetAll = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    include: {
      model: Review,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been successfully',
    result: restaurants.length,
    restaurants,
  });
});

exports.restaurantGetOne = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    message: 'The query has been successfully',
    restaurant,
  });
});

exports.restaurantUpdate = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({
    name: name.trim(),
    address: address.trim(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been updated successfully',
    restaurant,
  });
});

exports.restaurantDelete = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({
    status: 'desabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been deleted successfully',
  });
});

exports.restaurantCreateReview = catchAsync(async (req, res, next) => {
  const { sessionUser, restaurant } = req;
  const { comment, rating } = req.body;

  const review = await Review.create({
    comment: comment.trim(),
    rating: rating.trim(),
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been created successfully',
    review,
  });
});

exports.restauratUpdateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  // const { restaurantId, id } = req.params;
  const { review } = req;

  await review.update({
    comment: comment.trim(),
    rating: rating.trim(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been updated successfully',
    review,
  });
});

exports.restaurantdeleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: 'desabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been deleted successfully',
  });
});
