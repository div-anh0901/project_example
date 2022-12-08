const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyToken = require('../middleware/verifyToken');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', verifyToken, authController.profile);
router.post('/uploadAvatar', verifyToken, authController.uploadAvatar);
module.exports = router;