const { default: rateLimit } = require("express-rate-limit");

const rateLimitWindow = 15 * 60 * 1000; // 15 minutes
const rateLimitMaxRequests = 100; // Max requests per window

const rateLimitMap = new Map();
/**
 * Rate limiter middleware to limit the number of requests from a single IP address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, firstRequestTime: currentTime });
    } else {
        const userData = rateLimitMap.get(ip);
        userData.count += 1;

        // Check if the time window has expired
        if (currentTime - userData.firstRequestTime > rateLimitWindow) {
            userData.count = 1; // Reset count
            userData.firstRequestTime = currentTime; // Reset time
        }
    }

    if (rateLimitMap.get(ip).count > rateLimitMaxRequests) {
        return res.status(429).json({
            error: 'Too Many Requests',
            message: 'You have exceeded the number of allowed requests. Please try again later.'
        });
    }

    next();
}

const expressRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true, // Adds RateLimit headers
  legacyHeaders: false,  // Disables X-RateLimit-* headers
});