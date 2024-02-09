const express = require('express');
 const { uploadAndSaveCsvFiles } = require('../controllers/userController');

const router = express.Router();

// Your other route definitions...

// router.post('/perform-ocr', performOCR);
router.post('/UploadAndSaveCsvFiles', uploadAndSaveCsvFiles);
module.exports = router;
