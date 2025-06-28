const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const fileUploadRoutes = require('./uploadFile.routes');

router.use('/users', userRoutes);
router.use('/upload', require('./uploadFile.routes'));

module.exports = router;