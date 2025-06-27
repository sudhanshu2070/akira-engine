const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { timeLogger, errorLogger } = require('./middlewares/logger');
const { rateLimiter, expressRateLimiter } = require('./middlewares/rateLimiter'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use(expressRateLimiter); // Using express-rate-limit middleware for rate limiting
app.use(rateLimiter); // Middleware to limit request rate
app.use(timeLogger); // Middleware to log request time
app.use(errorLogger); // Middleware to log errors

app.use('/api/v1', routes); // Base route prefix

module.exports = app;