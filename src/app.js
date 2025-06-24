const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { timeLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors());
app.use(express.json());

app.use(timeLogger); // Middleware to log request time
app.use(errorLogger); // Middleware to log errors

app.use('/api/v1', routes); // Base route prefix

module.exports = app;