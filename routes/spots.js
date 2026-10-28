const express = require('express');
const router = express.Router();
const { getSpots, createSpot } = require('../controllers/spotController');
const { protect } = require('../middleware/authMiddleware');
const cache = require('../middleware/cacheMiddleware');

// @route   GET /api/spots
// @desc    Get all tourist spots (Cached in Redis for 60 seconds)
// @access  Public
// @route   POST /api/spots
// @desc    Create a new tourist spot
// @access  Private
router.route('/')
    .get(cache(60), getSpots)
    .post(protect, createSpot);

module.exports = router;