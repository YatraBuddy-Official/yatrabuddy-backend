const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    destination: { 
        type: String, 
        required: true, 
        index: true, // Indexed for blazing-fast destination searches
        lowercase: true 
    },
    category: { 
        type: String, 
        required: true, 
        index: true // Indexed for fast category filtering
    },
    description: { 
        type: String 
    },
    rating: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model('Spot', spotSchema);