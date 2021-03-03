const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const response = user.transform();
  res.status(httpStatus.CREATED).send(response);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  res.send(user.transform());
});

const deleteUserById = catchAsync(async (req, res) => {
  //const status = await userService.deleteUserById(req.params.userId);
  await userService.deleteUserById(req.params.userId);
  res.send(httpStatus.OK);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);
  res.send(user.transform());
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUserById,
};
