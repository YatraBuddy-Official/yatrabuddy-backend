const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const User = require('../config/models/User');

// 1. Strict Rate Limiter for Authentication (Prevents login spam / brute-forcing)
exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { success: false, error: 'Too many login attempts. Please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// 2. General API Rate Limiter
exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 requests per 15 minutes per IP
    message: { success: false, error: 'Too many requests, please slow down.' }
});

// 3. JWT Token Verification Middleware
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attaches user id and role to request
        next();
    } catch (err) {
        return res.status(403).json({ success: false, error: 'Invalid or expired token.' });
    }
};

// 4. Strict Admin Role Check Middleware (Protects Admin Routes)
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Access forbidden. Admins only.' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ success: false, error: 'Server error during admin verification.' });
    }
};