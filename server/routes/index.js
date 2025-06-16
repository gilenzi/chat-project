const express = require('express');
const {registerUser} = require('../controllers/register-user');
const checkEmail = require('../controllers/check-email');
const checkPassword = require('../controllers/check-password');
const userDetails = require('../controllers/user-details');
const logout = require('../controllers/logout');
const updateUserDetails = require('../controllers/update-user-details');

const router = express.Router();

router.post('/register', registerUser);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.get('/logout', logout);

router.get('/user-details', userDetails);
router.post('/update-user-details', updateUserDetails);

module.exports = router;
