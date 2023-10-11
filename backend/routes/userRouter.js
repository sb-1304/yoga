const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/verify/*', userController.userVerification)
router.post('/login', userController.checkLogin);
router.post('/register', userController.registerUser);

module.exports = router;