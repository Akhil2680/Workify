const express = require('express');
console.log('');
const {protect}  = require('../middlewares/authMiddleware');

const router = express.Router();

const { createWorkerProfile, getAllWorkers, getWorkerById } = require('../controllers/workerController');

router.post('/profile', protect, createWorkerProfile);
router.get('/', getAllWorkers);
router.get('/:id', getWorkerById);
module.exports = router;
