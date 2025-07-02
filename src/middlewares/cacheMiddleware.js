const cache = {};

const cacheMiddleware = (durationInSeconds = 60) => {
  return (req, res, next) => {
    const key = '__cache__' + req.originalUrl || req.url;

    if (cache[key] && (Date.now() < cache[key].expiry)) {
      console.log('Cache hit:', key);
      return res.send(cache[key].data);
    }

    console.log('Cache miss:', key);

    // Override res.send to store data in cache
    const originalSend = res.send.bind(res);
    res.send = (body) => {
      cache[key] = {
        data: body,
        expiry: Date.now() + durationInSeconds * 1000
      };
      originalSend(body);
    };

    next();
  };
};

module.exports = cacheMiddleware;