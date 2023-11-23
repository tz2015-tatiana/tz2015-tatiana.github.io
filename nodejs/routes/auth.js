const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post ('/register', authController.register);
router.post ('/login', authController.login);
router.get ('/profile', authController.profile);
router.post('/profile/change-name', authController.changeName);

module.exports = router;