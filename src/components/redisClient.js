const redis = require('redis');

const client = redis.createClient({
    url: 'redis://localhost:6379', // Change to your Redis URI if remote
});

client.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
});

client.on('connect', () => {
    console.log('✅ Connected to Redis');
});

client.connect(); // Required in redis v4+

// Wrapper methods
const cache = {
    async set(key, value, ttlInSeconds = 3600) {
        try {
            await client.set(key, JSON.stringify(value), {
                EX: ttlInSeconds,
            });
        } catch (err) {
            console.error('❌ Error setting Redis key:', err);
        }
    },

    async get(key) {
        try {
            const data = await client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error('❌ Error getting Redis key:', err);
            return null;
        }
    },

    async del(key) {
        try {
            await client.del(key);
        } catch (err) {
            console.error('❌ Error deleting Redis key:', err);
        }
    },
};

module.exports = cache;