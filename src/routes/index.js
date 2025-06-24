const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
// Add more route imports as needed

router.use('/users', userRoutes);

module.exports = router;