const express = require('express');
const authController = require('../../controllers/auth.controller');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');

const router = express.Router();

// router.post('/', authController.createUser);
router.post('/', validate(userValidation.createUser), authController.createUser);

module.exports = router;