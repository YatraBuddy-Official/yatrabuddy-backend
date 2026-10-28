const redisClient = require('../config/redis');

const cache = (duration) => {
    return async (req, res, next) => {
        // If Redis is not connected, skip caching and move to controller
        if (!redisClient.isOpen) {
            return next();
        }

        // CRITICAL FIX: Scope key by User ID to prevent cross-user data leaks!
        const userId = req.user && req.user._id ? req.user._id : 'guest';
        const key = `yatrabuddy:${userId}:${req.originalUrl}`;

        try {
            const cachedData = await redisClient.get(key);

            if (cachedData) {
                console.log(`Cache hit for ${key}`);
                return res.status(200).json(JSON.parse(cachedData));
            }

            console.log(`Cache miss for ${key}`);
            
            // Intercept res.json to store the response in Redis before sending it back
            const originalSend = res.json.bind(res);
            res.json = (body) => {
                redisClient.setEx(key, duration, JSON.stringify(body)).catch((err) => {
                    console.error('Redis setEx error:', err);
                });
                return originalSend(body);
            };

            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            next();
        }
    };
};

module.exports = cache;