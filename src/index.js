const app = require('./app');
const { port } = require('./config/config');

//const port = 8080;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
