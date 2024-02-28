const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth'); // Correct import statement
const { 
    uploadAndSaveCsvFiles,
    getAllVilagesData, 
    downloadCsvFile, 
    signUpUser, 
    signInUser, 
    updatedetails, 
    savesettings
} = require('../controllers/userController');

const router = express.Router();

// Define routes with authentication middleware

router.post('/uploadCsvData', isAuthenticatedUser, uploadAndSaveCsvFiles);
router.get('/getAllVilagesData',  getAllVilagesData);
router.get('/downloadCsvFile', isAuthenticatedUser, downloadCsvFile);
router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/updatedetails', isAuthenticatedUser, updatedetails);
router.post('/savesettings', isAuthenticatedUser, savesettings);

module.exports = router;
