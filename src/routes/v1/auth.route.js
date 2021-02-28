const express = require('express');
const authController = require('../../controllers/auth.controller');
const authValidation = require('../../validations/auth.validation');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');

const router = express.Router();

// router.post('/', authController.createUser);
router.post('/', validate(userValidation.createUser), authController.createUser);
router.post('/login', validate(authValidation.login), authController.login);

module.exports = router;
