const express = require('express');
const loggger = require('./config/logger');
const mongoose = require('./config/mongoose');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');

//mongoose.connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);

app.use(errorConverter);

// handle error
app.use(errorHandler);

mongoose.connect().then(() => {
  loggger.info('Connected to MongoDB');
  app.emit('ready');
});

module.exports = app;
