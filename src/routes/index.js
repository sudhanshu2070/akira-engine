const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const fileUploadRoutes = require('./uploadFile.routes');
const testRoutes = require('./test.route'); 
const pushRoutes = require('./push.route');

router.use('/users', userRoutes);
router.use('/upload', fileUploadRoutes);
router.use('/testWithSampleData', testRoutes);
router.use('/push', pushRoutes);

module.exports = router;