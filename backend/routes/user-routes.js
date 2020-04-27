const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// Create user
router.post('/signup', userController.signUp);

// Login user
router.post('/login', userController.login);

// router.post('/checkauth', userController.checkAuth);
// router.get("/userProfile/:id", checkAuth, userController.getUserProfileById);

module.exports = router;
