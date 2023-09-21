const express = require('express');
const {
  checkPosition,
  search
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();
router.get('/products/search/:keyword', search);

router.post('/CheckUserLocation', checkPosition);

module.exports = router;
