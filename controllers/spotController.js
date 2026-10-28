const Spot = require('../config/models/Spot');

// @desc    Get spots (filter by destination and optional category)
// @route   GET /api/spots?destination=Manali&category=cafe
// @access  Public (or Protected)
const getSpots = async (req, res) => {
    try {
        const { destination, category } = req.query;

        if (!destination) {
            return res.status(400).json({ success: false, message: 'Please provide a destination query (e.g., ?destination=Manali)' });
        }

        // Build query object
        let query = { destination: new RegExp(destination, 'i') }; // Case-insensitive match
        if (category) {
            query.category = category;
        }

        const spots = await Spot.find(query);

        res.status(200).json({
            success: true,
            count: spots.length,
            data: spots
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add a new spot
// @route   POST /api/spots
// @access  Private (or open for seeding)
const createSpot = async (req, res) => {
    try {
        const spot = await Spot.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Spot added successfully',
            data: spot
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getSpots, createSpot };