const cache = require('../redisClient');

const getUserById = async (req, res) => {
    const userId = req.params.id;
    const cacheKey = `user:${userId}`;

    try {
        // Try cache
        const cachedUser = await cache.get(cacheKey);
        if (cachedUser) {
            return res.status(200).json({
                source: 'cache',
                data: cachedUser,
            });
        }

        // Simulate database lookup
        const user = {
            id: userId,
            name: 'John Doe',
            email: 'john@example.com',
        };

        // Save to Redis
        await cache.set(cacheKey, user, 300); // TTL = 5 minutes

        return res.status(200).json({
            source: 'database',
            data: user,
        });
    } catch (err) {
        console.error('Error in getUserById:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getUserById };