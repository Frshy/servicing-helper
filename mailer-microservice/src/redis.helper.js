const Redis = require('redis');

const redisClient = Redis.createClient({
    url: 'redis://redis:6379'
});

function getOrSetCacheObject(key, callback) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await redisClient.get(key);
            if (data) return resolve(JSON.parse(data));

            const freshData = await callback();
            redisClient.setEx(key, 3600, JSON.stringify(freshData));
            resolve(freshData);
        } catch (err) {
            resolve(err)
        }
    });
}

module.exports = {
    redisClient,
    getOrSetCacheObject
};

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('reconnecting', () => {
    console.log('Redis client is reconnecting...');
});

redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

redisClient.connect((err, data) => {
    if (err) throw err;
})