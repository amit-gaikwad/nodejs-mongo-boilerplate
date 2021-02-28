const Joi = require('@hapi/joi');
const validationUtils = require('../utils/validation.util');
const { password, objectId } = require('./custom.validation');

const crateUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).custom(validationUtils.validatePassword),
    name: Joi.string().required(),
    mobile: Joi.number().required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

module.exports = {
  crateUser,
  getUser,
  updateUser,
};
