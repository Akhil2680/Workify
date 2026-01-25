const pool = require('../config/db');
const { isDate, parseISO } = require('date-fns');

// Book a worker
const bookWorker = async(req, res, next) => {
  try {
    const userId = req.user.id; // from auth middleware
    const workerId = req.params.workerId;
    const { bookingDate, hours } = req.body;
    // Validate input
    if (!bookingDate || !hours) {
      res.status(400);
      throw new Error('Please provide booking date and hours');
    }
    // check role
    if (req.user.role !== 'client') {
      res.status(403);
      throw new Error('Only clients can book workers');
    }
    // worker existence check
    const [workerRows] = await pool.execute(
      'SELECT id FROM workers WHERE id = ?',
      [workerId]
    );
    if (workerRows.length === 0) {
      res.status(404);
      throw new Error('Worker not found');
    }
    //check date validity
    if (new Date(bookingDate) < new Date()) {
      res.status(400);
      throw new Error('Booking date must be in the future');
    }
    // date format check
    if (isNaN(Date.parse(bookingDate))) {
      res.status(400);
      throw new Error('Invalid date format');
    }
    // date must no be more than 1 month in future
    const maxFutureDate = new Date();
    maxFutureDate.setMonth(maxFutureDate.getMonth() + 1);
    if (new Date(bookingDate) > maxFutureDate) {
      res.status(400);
      throw new Error('Booking date must be within one month');
    }
    //Hours validation
    if (hours <= 0 || hours > 24) {
      res.status(400);
      throw new Error('Hours must be between 1 and 24');
    }
    // Insert booking into database
    const [result] = await pool.execute(
      `INSERT INTO bookings (user_id, worker_id, booking_date, hours) 
       VALUES (?, ?, ?, ?)`,
      [userId, workerId, bookingDate, hours]
    );
    res.status(201).json({
      success: true,
      message: 'Worker booked successfully',
      bookingId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};


// Accept booking
const acceptBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;          // logged-in worker's user id
    const bookingId = req.params.bookingId;

    // 1. Role check
    if (req.user.role !== 'worker') {
      res.status(403);
      throw new Error('Only workers can accept bookings');
    }

    // 2. Check booking existence + ownership + status
    const [bookingRows] = await pool.execute(
      `SELECT b.id, b.booking_status
       FROM bookings b
       JOIN workers w ON b.worker_id = w.id
       WHERE b.id = ? AND w.user_id = ?`,
      [bookingId, userId]
    );

    // 3. Booking existence check
    if (bookingRows.length === 0) {
      res.status(404);
      throw new Error('Booking not found or not assigned to you');
    }

    // 4. Status check
    if (bookingRows[0].booking_status !== 'pending') {
      res.status(400);
      throw new Error(
        `Booking cannot be accepted. Current status: ${bookingRows[0].booking_status}`
      );
    }

    // 5. Update booking status → accepted
    await pool.execute(
      `UPDATE bookings
       SET booking_status = 'accepted'
       WHERE id = ?`,
      [bookingId]
    );

    // 6. Success response
    res.status(200).json({
      success: true,
      message: 'Booking accepted successfully',
    });

  } catch (error) {
    next(error);
  }
};


// Cancel booking (worker)
const cancelBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;               // logged-in worker
    const bookingId = req.params.bookingId;

    // 1. Role check
    if (req.user.role !== 'worker') {
      res.status(403);
      throw new Error('Only workers can cancel bookings');
    }

    // 2. Check booking existence + ownership + status
    const [bookingRows] = await pool.execute(
      `SELECT b.id, b.booking_status
       FROM bookings b
       JOIN workers w ON b.worker_id = w.id
       WHERE b.id = ? AND w.user_id = ?`,
      [bookingId, userId]
    );

    // 3. Booking existence
    if (bookingRows.length === 0) {
      res.status(404);
      throw new Error('Booking not found or not assigned to you');
    }

    // 4. Status validation
    if (!['pending', 'accepted'].includes(bookingRows[0].booking_status)) {
      res.status(400);
      throw new Error(
        `Booking cannot be cancelled. Current status: ${bookingRows[0].booking_status}`
      );
    }

    // 5. Update status → cancelled
    await pool.execute(
      `UPDATE bookings
       SET booking_status = 'cancelled'
       WHERE id = ?`,
      [bookingId]
    );

    // 6. Success response
    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
    });

  } catch (error) {
    next(error);
  }
};

// Cancel booking (client)
const cancelBookingByClient = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;

    if (req.user.role !== 'client') {
      res.status(403);
      throw new Error('Only clients can cancel bookings');
    }

    const [rows] = await pool.execute(
      `SELECT booking_status
       FROM bookings
       WHERE id=? AND user_id=?`,
      [bookingId, userId]
    );

    if (rows.length === 0) {
      res.status(404);
      throw new Error('Booking not found');
    }

    if (!['pending','accepted'].includes(rows[0].booking_status)) {
      res.status(400);
      throw new Error('Booking cannot be cancelled');
    }

    await pool.execute(
      `UPDATE bookings SET booking_status='cancelled' WHERE id=?`,
      [bookingId]
    );

    res.status(200).json({ success:true, message:'Booking cancelled' });
  } catch (e) { next(e); }
};

// Complete booking (worker)
const completeBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;

    if (req.user.role !== 'worker') {
      res.status(403);
      throw new Error('Only workers can complete bookings');
    }

    const [rows] = await pool.execute(
      `SELECT b.booking_status
       FROM bookings b
       JOIN workers w ON b.worker_id = w.id
       WHERE b.id = ? AND w.user_id = ?`,
      [bookingId, userId]
    );

    if (rows.length === 0) {
      res.status(404);
      throw new Error('Booking not found or not assigned to you');
    }

    if (rows[0].booking_status !== 'accepted') {
      res.status(400);
      throw new Error('Only accepted bookings can be completed');
    }

    await pool.execute(
      `UPDATE bookings SET booking_status='completed' WHERE id=?`,
      [bookingId]
    );

    res.status(200).json({ success: true, message: 'Booking completed' });
  } catch (e) { next(e); }
};

const getClientBookings = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      `SELECT b.*, w.service_type, w.location
       FROM bookings b
       JOIN workers w ON b.worker_id = w.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (e) { next(e); }
};
const getWorkerBookings = async (req, res, next) => {
  try {
    if (req.user.role !== 'worker') {
      res.status(403);
      throw new Error('Workers only');
    }

    const [rows] = await pool.execute(
      `SELECT b.*, u.name AS client_name
       FROM bookings b
       JOIN workers w ON b.worker_id = w.id
       JOIN users u ON b.user_id = u.id
       WHERE w.user_id = ?
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (e) { next(e); }
};



module.exports = { bookWorker, acceptBooking, cancelBooking, cancelBookingByClient, completeBooking, getClientBookings, getWorkerBookings };