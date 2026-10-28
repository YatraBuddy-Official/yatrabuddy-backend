const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true // Indexed for blazing-fast login/lookup searches
    },
    password: { 
        type: String, 
        required: true, 
        select: false 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // Ensures regular signups are standard users
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    preferences: {
        tripReminders: { type: Boolean, default: true },
        promotionalEmails: { type: Boolean, default: false },
        emailNotifications: { type: Boolean, default: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);