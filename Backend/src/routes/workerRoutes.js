const express = require('express');
const { createWorkerProfile } = require('../controllers/workerController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/profile', protect, createWorkerProfile);

module.exports = router;
console.log('Worker routes loaded');
