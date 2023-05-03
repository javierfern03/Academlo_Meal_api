const express = require('express');

//CONTROLLERS
const orderController = require('../controllers/order.controller');

//MIDDLEWARES
const protectsMiddleware = require('../middlewares/protects.middleware');
const orderMiddleware = require('../middlewares/order.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

router.use(protectsMiddleware.protect);

router.post(
  '/',
  validationMiddleware.validationCreateOrder,
  orderController.orderCreate
);

router.get('/me', orderController.orderGetMyAll);

router
  .route('/:id')
  .patch(
    orderMiddleware.oneOrder,
    protectsMiddleware.protectOwner,
    orderController.orderUpdate
  )
  .delete(
    orderMiddleware.oneOrder,
    protectsMiddleware.protectOwner,
    orderController.orderDelete
  );

module.exports = router;
