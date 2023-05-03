const Order = require('../models/orders.model');
const catchAsync = require('../utils/catchAsync');

exports.oneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!order) {
    next(new AppError('order not found'));
  }

  req.order = order;
  next();
});
