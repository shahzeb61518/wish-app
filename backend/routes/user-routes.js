const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const extractFile = require('../middleware/file');

// Create user
router.post('/signup', userController.signUp);

// Login user
router.post('/login', userController.login);

// User by ID
router.post('/get', userController.getUserById);

// User update
router.post('/update', extractFile, userController.userUpdate);

// router.post('/checkauth', userController.checkAuth);
// router.get("/userProfile/:id", checkAuth, userController.getUserProfileById);

module.exports = router;
