const User = require('../config/models/User');

// @desc    Get user profile & preferences
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                preferences: user.preferences
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user notification preferences
// @route   PUT /api/users/preferences
// @access  Private
const updatePreferences = async (req, res) => {
    try {
        const { tripReminders, promotionalEmails, emailNotifications } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update preferences if provided in the request body
        if (tripReminders !== undefined) user.preferences.tripReminders = tripReminders;
        if (promotionalEmails !== undefined) user.preferences.promotionalEmails = promotionalEmails;
        if (emailNotifications !== undefined) user.preferences.emailNotifications = emailNotifications;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'Preferences updated successfully',
            data: updatedUser.preferences
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getUserProfile, updatePreferences };