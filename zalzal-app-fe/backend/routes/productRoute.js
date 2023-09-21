const express = require('express');
const { 
    createAnnouncement,
} = require('../controllers/productController');
const router = express.Router();


router.post('/createAnnouncement',createAnnouncement )

module.exports = router;

