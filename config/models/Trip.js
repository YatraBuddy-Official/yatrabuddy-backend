const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        index: true // Indexed for blazing-fast user trip lookups
    },
    destination: { 
        type: String, 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    budget: { 
        type: Number 
    },
    itinerary: [
        {
            dayNumber: { type: Number, required: true },
            title: { type: String, required: true },
            activities: [
                {
                    timeSlot: { type: String },
                    title: { type: String },
                    description: { type: String }
                }
            ]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);