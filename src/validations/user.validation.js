const Joi = require('@hapi/joi');
const validationUtils = require('../utils/validation.util');

const crateUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).custom(validationUtils.validatePassword),
    name: Joi.string().required(),
    mobile: Joi.number().required(),
  }),
};

module.exports = {
  crateUser,
};
