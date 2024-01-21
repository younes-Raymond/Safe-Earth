const express = require('express');
const {
  search
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();
router.get('/search/:keyword', search);

// router.post('/CheckUserLocation', checkPosition);

module.exports = router;


