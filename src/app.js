const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { timeLogger, errorLogger } = require('./middlewares/logger');
const { rateLimiter, expressRateLimiter } = require('./middlewares/rateLimiter'); 
const {
  registerUser,
  loginUser,
  authenticateToken,
  getProfile
} = require('./controllers/authController');

const app = express();

app.use(cors());
app.use(express.json());

app.use(expressRateLimiter); // Using express-rate-limit middleware for rate limiting
app.use(rateLimiter); // Middleware to limit request rate
app.use(timeLogger); // Middleware to log request time
app.use(errorLogger); // Middleware to log errors

app.use('/api/v1', routes); // Base route prefix

app.use('/api/data', cacheMiddleware(30)); // cache for 30 seconds

app.get('/api/data', (req, res) => {
  // Simulate slow data
  setTimeout(() => {
    res.send({ message: 'Fresh data from DB', timestamp: new Date() });
  }, 1000);
});

module.exports = app;