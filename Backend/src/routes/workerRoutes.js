const express = require('express');
console.log('🔥 workerRoutes file loaded');

const router = express.Router();

const { createWorkerProfile, getAllWorkers, getWorkerById } = require('../controllers/workerController');
    const {protect}  = require('../middlewares/authMiddleware');

router.post('/profile', protect, createWorkerProfile);
router.get('/', getAllWorkers);
router.get('/:id', getWorkerById);
module.exports = router;
