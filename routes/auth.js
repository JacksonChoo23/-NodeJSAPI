const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.get('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

module.exports = router;
