const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

//router.route('/').post(validate(userValidation.createUser), userController.createUser);
router.route('/').post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser);

module.exports = router;
