const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.validationUserSignUp = [
  body('name').notEmpty().withMessage('The name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('The email cannot be empty')
    .isEmail()
    .withMessage('invalid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8, max: 16 })
    .withMessage(
      'The password must have a minimum of 8 characters and a maximum of 16'
    ),
  validFields,
];

exports.validationUserlogin = [
  body('email')
    .notEmpty()
    .withMessage('The email cannot be empty')
    .isEmail()
    .withMessage('invalid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8, max: 16 })
    .withMessage(
      'The password must have a minimum of 8 characters and a maximum of 16'
    ),
  validFields,
];

exports.validationUserUpdate = [
  body('name').notEmpty().withMessage('The name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('The email cannot be empty')
    .isEmail()
    .withMessage('invalid email'),
  validFields,
];

exports.validationCreateRestaurant = [
  body('name').notEmpty().withMessage('Tne name cannot be empty'),
  body('address').notEmpty().withMessage('The address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('The rating cannot be empty')
    .custom((value) => {
      if (value >= 1 && value <= 5) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage('the rating has to be a number between 1 and 5'),
  validFields,
];

exports.validationUpdateRestaurant = [
  body('name').notEmpty().withMessage('Tne name cannot be empty'),
  body('address').notEmpty().withMessage('The address cannot be empty'),
  validFields,
];

exports.validationReview = [
  body('comment').notEmpty().withMessage('Tne name cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('The rating cannot be empty')
    .custom((value) => {
      if (value >= 1 && value <= 5) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage('the rating has to be a number between 1 and 5'),
  validFields,
];

exports.validationMeal = [
  body('name').notEmpty().withMessage('The name cannot be empty'),
  body('price').notEmpty().withMessage('The price cannot be empty'),
  validFields,
];

exports.validationCreateOrder = [
  body('quantity').notEmpty().withMessage('The quantity cannot be empty'),
  body('mealId').notEmpty().withMessage('The mealId cannot be empty'),
  validFields,
];
