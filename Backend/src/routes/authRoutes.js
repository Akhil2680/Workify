console.log('Auth routes loaded');
const express = require('express');
// const { registerUser } = require('../controllers/authController');
const { registerUser, loginUser } = require('../controllers/authController');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;
console.log('Auth routes loaded');