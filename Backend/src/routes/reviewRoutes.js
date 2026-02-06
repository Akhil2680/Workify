const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { submitReview, getWorkerReviews } = require('../controllers/reviewController');

router.post('/', protect, submitReview);
router.get('/worker/:workerId', getWorkerReviews);

module.exports = router;
