const express = require('express');
const { route } = require('./users.routes');

//CONTROLLERS
const restaurantController = require('../controllers/restaurant.controller');

//MIDDLEWARES
const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const protectsMiddleware = require('../middlewares/protects.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    protectsMiddleware.protect,
    validationMiddleware.validationCreateRestaurant,
    protectsMiddleware.restrictTo('admin'),
    restaurantController.restaurantCreate
  )
  .get(restaurantController.restaurantsGetAll);

router
  .route('/:id')
  .get(restaurantMiddleware.restaurant, restaurantController.restaurantGetOne)
  .patch(
    protectsMiddleware.protect,
    validationMiddleware.validationUpdateRestaurant,
    restaurantMiddleware.restaurant,
    protectsMiddleware.restrictTo('admin'),
    restaurantController.restaurantUpdate
  )
  .delete(
    protectsMiddleware.protect,
    restaurantMiddleware.restaurant,
    protectsMiddleware.restrictTo('admin'),
    restaurantController.restaurantDelete
  );

router.use(protectsMiddleware.protect);

router.post(
  '/reviews/:id',
  validationMiddleware.validationReview,
  restaurantMiddleware.restaurant,
  restaurantController.restaurantCreateReview
);

router
  .route('/reviews/:id')
  .patch(
    validationMiddleware.validationReview,
    restaurantMiddleware.ifExistRestaurantReview,
    protectsMiddleware.protectOwner,
    restaurantController.restauratUpdateReview
  )
  .delete(
    restaurantMiddleware.ifExistRestaurantReview,
    protectsMiddleware.protectOwner,
    restaurantController.restaurantdeleteReview
  );

module.exports = router;
