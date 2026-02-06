const pool = require('../config/db');

const createWorkerProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Get user role from DB
    const [userRows] = await pool.execute(
      'SELECT role FROM users WHERE id = ?',
      [userId]
    );
 
    if (userRows.length === 0) {
      res.status(404);
      throw new Error('User not found');
    }

    if (userRows[0].role !== 'worker') {
      res.status(403);
      throw new Error('Access denied. Only workers can create profiles');
    }

    // 2️⃣ Check if worker profile already exists
    const [existingProfile] = await pool.execute(
      'SELECT id FROM workers WHERE user_id = ?',
      [userId]
    );

    if (existingProfile.length > 0) {
      res.status(400);
      throw new Error('Worker profile already exists');
    }

    // 3️⃣ Extract worker details from request body
    const {
      service_type,
      experience_years,
      price_per_hour,
      location
    } = req.body;

    if (!service_type || !experience_years || !price_per_hour || !location) {
      res.status(400);
      throw new Error('All worker profile fields are required');
    }

    // 4️⃣ Insert worker profile
    const [result] = await pool.execute(
      `INSERT INTO workers 
       (user_id, service_type, experience_years, price_per_hour, location) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, service_type, experience_years, price_per_hour, location]
    );

    // 5️⃣ Success response
    res.status(201).json({
      success: true,
      message: 'Worker profile created successfully',
      workerId: result.insertId
    });

  } catch (error) {
    next(error);
  }
};

// Additional controller functions for fetching workers

const getAllWorkers = async (req, res, next) => {
  try {
    // fetch all workers with review summary
    const [workers] = await pool.execute(`
      SELECT
        w.id,
        u.name,
        w.service_type,
        w.experience_years,
        w.price_per_hour,
        w.availability,
        w.location,
        COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating,
        COUNT(r.id) AS total_reviews
      FROM workers w
      JOIN users u ON w.user_id = u.id
      LEFT JOIN reviews r ON r.worker_id = w.id
      GROUP BY w.id, u.name, w.service_type, w.experience_years, w.price_per_hour, w.availability, w.location
      ORDER BY w.id DESC;
   `);
    res.status(200).json({
      success: true,
      count: workers.length,
      workers
    });
  } catch (error) {
    next(error);
  }
};

const getWorkerById = async (req, res, next) => {
  try {
    // fetch single worker by id with rating summary
    const workerId = req.params.id;
    const [workers] = await pool.execute(
      `SELECT
         w.*, 
         u.name,
         COALESCE(ROUND(AVG(r.rating), 2), 0) AS average_rating,
         COUNT(r.id) AS total_reviews
       FROM workers w
       JOIN users u ON w.user_id = u.id
       LEFT JOIN reviews r ON r.worker_id = w.id
       WHERE w.id = ?
       GROUP BY w.id, u.name`,
      [workerId]
    );

    if (workers.length === 0) {
      res.status(404);
      throw new Error('Worker not found');
    }

    res.status(200).json({ success: true, worker: workers[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWorkerProfile,
  getAllWorkers,
  getWorkerById
};
