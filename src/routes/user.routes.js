const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', authController.authenticateToken, authController.getProfile);

module.exports = router;