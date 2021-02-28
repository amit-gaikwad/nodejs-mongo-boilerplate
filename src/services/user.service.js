const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const ERROR_MESSAGES = require('../constants/errorMessage');

const checkDuplicateEmail = async (email, excludeUserId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
  }
};

const createUser = async (userBody) => {
  await checkDuplicateEmail(userBody.email);
  const user = await User.create(userBody);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found with this email');
  }
  return user;
};
const getUserById = async (id) => {
    return User.findById(id);
  };

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
};
