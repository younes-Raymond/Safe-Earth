const express = require('express');
 const { uploadAndSaveCsvFiles, getAllVilagesData, downloadCsvFile } = require('../controllers/userController');

const router = express.Router();

// Your other route definitions...

// router.post('/perform-ocr', performOCR);
router.post('/uploadCsvData', uploadAndSaveCsvFiles);
router.get('/getAllVilagesData', getAllVilagesData);
router.get('/downloadCsvFile', downloadCsvFile);
module.exports = router;
