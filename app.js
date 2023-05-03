const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const userRouter = require('./routes/users.routes');
const ordersRouter = require('./routes/orders.routes');
const mealsRouter = require('./routes/meals.routes');
const restaurantRouter = require('./routes/restaurants.routes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/restaurants', restaurantRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server1! `, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
