const express = require('express');
const router = express.Router();

const {protect}  = require('../middlewares/authMiddleware');

const { bookWorker, getBookingsByUser, cancelBooking, acceptBooking, completeBooking, cancelBookingByClient, getClientBookings, getWorkerBookings } = require('../controllers/bookingController');
 

router.post('/book/:workerId', protect, bookWorker);

router.patch('/:bookingId/accept', protect, acceptBooking);

router.patch('/:bookingId/cancel', protect, cancelBooking);
router.patch('/:bookingId/complete', protect, completeBooking);
router.patch('/:bookingId/cancel-client', protect, cancelBookingByClient);
router.get('/client/history', protect, getClientBookings);
router.get('/worker/history', protect, getWorkerBookings);

module.exports = router;