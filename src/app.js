const express = require('express');
const passport = require('passport');
const loggger = require('./config/logger');
const mongoose = require('./config/mongoose');
const routes = require('./routes/v1');
const { jwtStrategy } = require('./config/passport');

const { errorConverter, unknownRouteHandler, errorHandler } = require('./middlewares/error');

//mongoose.connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);

app.use(errorConverter);

// handle error
app.use(errorHandler);

// send back a 404 error for any unknown api request
app.use(unknownRouteHandler);

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

mongoose.connect().then(() => {
  loggger.info('Connected to MongoDB');
  app.emit('ready');
});

module.exports = app;
