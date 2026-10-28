const express = require('express');
const router = express.Router();
const {
    getTrips,
    getTripById,
    createTrip,
    addItineraryDay,
    deleteTrip,
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const cache = require('../middleware/cacheMiddleware'); // Import cache function

router.route('/')
    .get(protect, cache(300), getTrips) // Cache trips for 5 minutes per user!
    .post(protect, createTrip);

router.route('/:id')
    .get(protect, getTripById)
    .delete(protect, deleteTrip);

router.route('/:id/itinerary')
    .put(protect, addItineraryDay);

module.exports = router;