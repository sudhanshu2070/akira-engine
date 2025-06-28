const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/fileUpload');
const fileUploadController = require('../controllers/fileUpload.controller');

// Route to handle file upload
router.post('/upload', upload.single('file'), fileUploadController);

module.exports = router;