const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const ERROR_MESSAGES= require('../constants/errorMessage');

const checkDuplicateEmail = async (email, excludeUserId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
  }
};

const createUser = async userBody => {
  await checkDuplicateEmail(userBody.email);
  const user = await User.create(userBody);
  return user;
};

module.exports = {
  createUser,
};