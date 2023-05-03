const User = require('../models/users.model');
const Order = require('../models/orders.model');
const Review = require('../models/reviews.model');
const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');

const initModel = () => {
  User.hasMany(Review);
  Review.belongsTo(User);

  User.hasMany(Order);
  Order.belongsTo(User);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Order.belongsTo(Meal);
  Meal.belongsTo(Order);
};

module.exports = initModel;
