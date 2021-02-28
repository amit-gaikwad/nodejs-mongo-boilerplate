const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

// const port = 8080;
app.on('ready', () => {
    app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
});
