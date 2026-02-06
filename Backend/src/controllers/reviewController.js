const pool = require('../config/db');

const submitReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookingId, rating, comment } = req.body;

    if (req.user.role !== 'client') {
      res.status(403);
      throw new Error('Only clients can submit reviews');
    }

    if (!bookingId || !rating) {
      res.status(400);
      throw new Error('bookingId and rating are required');
    }

    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      res.status(400);
      throw new Error('Rating must be an integer between 1 and 5');
    }

    const [bookingRows] = await pool.execute(
      `SELECT id, worker_id, booking_status
       FROM bookings
       WHERE id = ? AND user_id = ?`,
      [bookingId, userId]
    );

    if (bookingRows.length === 0) {
      res.status(404);
      throw new Error('Booking not found');
    }

    if (bookingRows[0].booking_status !== 'completed') {
      res.status(400);
      throw new Error('You can only review completed bookings');
    }

    const [existingReview] = await pool.execute(
      'SELECT id FROM reviews WHERE booking_id = ?',
      [bookingId]
    );

    if (existingReview.length > 0) {
      res.status(400);
      throw new Error('Review already submitted for this booking');
    }

    const [result] = await pool.execute(
      `INSERT INTO reviews (booking_id, user_id, worker_id, rating, comment)
       VALUES (?, ?, ?, ?, ?)`,
      [bookingId, userId, bookingRows[0].worker_id, numericRating, comment || null]
    );

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      reviewId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

const getWorkerReviews = async (req, res, next) => {
  try {
    const workerId = req.params.workerId;

    const [workerRows] = await pool.execute('SELECT id FROM workers WHERE id = ?', [workerId]);
    if (workerRows.length === 0) {
      res.status(404);
      throw new Error('Worker not found');
    }

    const [reviews] = await pool.execute(
      `SELECT r.id, r.booking_id, r.rating, r.comment, r.created_at, u.name AS client_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.worker_id = ?
       ORDER BY r.created_at DESC`,
      [workerId]
    );

    const [summaryRows] = await pool.execute(
      `SELECT COALESCE(ROUND(AVG(rating), 2), 0) AS averageRating, COUNT(*) AS totalReviews
       FROM reviews
       WHERE worker_id = ?`,
      [workerId]
    );

    res.status(200).json({
      success: true,
      workerId: Number(workerId),
      averageRating: Number(summaryRows[0].averageRating),
      totalReviews: Number(summaryRows[0].totalReviews),
      reviews
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitReview,
  getWorkerReviews
};
