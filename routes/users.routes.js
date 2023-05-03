const express = require('express');

//CONTROLLERS
const userController = require('../controllers/users.controller');

//MIDDLEWARES
const userMiddleware = require('../middlewares/user.middleware');
const protectsMiddleware = require('../middlewares/protects.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.validationUserSignUp,
  userController.userSignup
);

router.post(
  '/login',
  validationMiddleware.validationUserlogin,
  userController.userLogin
);

router.use(protectsMiddleware.protect);

router
  .route('/:id')
  .patch(
    userMiddleware.getOneUser,
    validationMiddleware.validationUserUpdate,
    protectsMiddleware.protectOwner,
    userController.userUpdate
  )
  .delete(
    userMiddleware.getOneUser,
    protectsMiddleware.protectOwner,
    userController.userDelete
  );

router.get('/orders', userController.userOrders);
router.get('/orders/:id', userController.userOneOrder);

module.exports = router;
