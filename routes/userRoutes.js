const express = require('express');
const router = express.Router();
const { getUserProfile, updatePreferences } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getUserProfile);
router.route('/preferences').put(protect, updatePreferences);

module.exports = router;