const httpStatus = require('http-status');
const { userService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const response = {
    user: user.transform(),
  };
  res.status(httpStatus.CREATED).send(response);
});

module.exports = {
  createUser,
};
