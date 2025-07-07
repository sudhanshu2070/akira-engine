// routes/pushRoutes.js

const express = require('express');
const router = express.Router();
const pushController = require('../controllers/pushController');

// POST /api/push/send
router.post('/send', pushController.sendNotification);

module.exports = router;