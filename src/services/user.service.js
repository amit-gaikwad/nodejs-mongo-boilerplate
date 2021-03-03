const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const { User } = require('../models');
const ERROR_MESSAGES = require('../constants/errorMessage');
const logger = require('../config/logger');

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

const deleteUserById = async (_id) => {
  const res = await User.deleteOne({ _id });
  if (res.deletedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found with this id');
  }
  return res;
};

const updateUser = async(id,updateBody)=>{
    const user = await getUserById(id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'No user found with this id');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    console.log("updateBody",id,updateBody);
    Object.assign(user, updateBody);
    user.save();
    return user;
}

const getUserById = async (id) => {
  return User.findById(id);
};

const getAllUsers = async () => {
  const users =await User.find();
  logger.info("users>>",users)
  return users;
};


module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  deleteUserById,
  updateUser,
  getAllUsers
};
