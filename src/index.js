const app = require('./app');
const { port } = require('./config/config');
const logger = require('./config/logger');

// const port = 8080;
app.listen(port, () => {
  logger.info(`Listening to port ${port}`);
  // console.log(`Listening to port ${port}`);
});
