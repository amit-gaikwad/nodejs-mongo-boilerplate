const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { omit, pick } = require('lodash');
const { roles } = require('../config/roles');
const ERROR_MESSAGES = require('../constants/errorMessage');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(ERROR_MESSAGES.INVALID_EMAIL);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
          throw new Error(ERROR_MESSAGES.PASSWORD_VALIDATION_ERROR);
        }
      },
    },
    role: {
      type: String,
      enum: roles,
      // TODO need to add user instead of admin later
      defualt: 'admin',
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value.toString()) || !value.toString().match(/\d{10}/)) {
          throw new Error(ERROR_MESSAGES.MOBILE_NOT_VALID);
        }
      },
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  return omit(user.toObject(), ['password']);
};

userSchema.methods.transform = function () {
  const user = this;
  return pick(user.toJSON(), ['id', 'email', 'name', 'role']);
};

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.methods.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};


userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
