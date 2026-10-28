const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: false // Disables endless retry spam if Redis is offline
    }
});

let isRedisConnected = false;

redisClient.on('error', (err) => {
    if (!isRedisConnected) {
        // Suppress repetitive error spam after the initial check
        return;
    }
    console.error('Redis Client Error:', err.message);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        isRedisConnected = true;
        console.log('Redis Connected Successfully');
    } catch (error) {
        console.log('Notice: Redis server not running locally. Caching is currently disabled.');
    }
};

connectRedis();

module.exports = redisClient;