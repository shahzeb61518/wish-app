const express = require('express');
const router = express.Router();
const wishController = require('../controllers/wish-controller');
const extractFile = require('../middleware/file');

// Create a Wish
router.post('/add', extractFile, wishController.addWish);

// Get Wish 
router.post('/get', wishController.getWish);

// Update Wish
// router.post("/:id", wishController.updateWish)

// Delete Wish by Id
router.post("/:id", wishController.deleteWish)

module.exports = router;
