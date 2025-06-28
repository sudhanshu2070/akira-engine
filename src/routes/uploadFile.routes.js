const express = require('express');
const router = express.Router();
const { fileUpload } = require('../middlewares/fileUpload');
const { uploadFile } = require('../controllers/fileUpload.controller');

// Route to handle file upload
router.post('/upload', fileUpload.single('file'), uploadFile);

module.exports = router;