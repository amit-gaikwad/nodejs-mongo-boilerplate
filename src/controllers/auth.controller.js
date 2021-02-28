const httpStatus = require('http-status');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  const response = {
    user: user.transform(),
  };
  res.status(httpStatus.CREATED).send(response);
};

module.exports = {
  createUser,
};
