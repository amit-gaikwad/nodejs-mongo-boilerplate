const express = require('express');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/user', authController.createUser);

module.exports = router;