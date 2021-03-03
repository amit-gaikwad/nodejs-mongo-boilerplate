const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// router.route('/').post(validate(userValidation.createUser), userController.createUser);
// router.route('/').post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser);
router.route('/').post(validate(userValidation.createUser), userController.createUser);
router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUserById);

module.exports = router;
