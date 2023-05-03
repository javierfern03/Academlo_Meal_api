const express = require('express');

//CONTROLLERS
const mealController = require('../controllers/meal.controller');

//MIDDLEWARES
const mealMiddleware = require('../middlewares/meal.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const protectsMiddleware = require('../middlewares/protects.middleware');

const router = express.Router();

router.get('/', mealController.mealsGetAll);

router.get('/:id', mealMiddleware.oneMeal, mealController.mealGetOne);

router
  .use(protectsMiddleware.protect)
  .route('/:id')
  .post(
    protectsMiddleware.restrictTo('admin'),
    validationMiddleware.validationMeal,
    mealController.mealCreate
  )
  .patch(
    protectsMiddleware.restrictTo('admin'),
    validationMiddleware.validationMeal,
    mealMiddleware.oneMeal,
    mealController.mealUpdate
  )
  .delete(
    protectsMiddleware.restrictTo('admin'),
    mealMiddleware.oneMeal,
    mealController.mealDelete
  );

module.exports = router;
