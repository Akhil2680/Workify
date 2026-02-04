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
    // fetch all workers (with optional filters)
    const [workers] = await pool.execute(`
     SELECT
  workers.id,
  users.name,
  workers.service_type,
  workers.experience_years,
  workers.price_per_hour,
  workers.availability,
  workers.location
FROM workers
JOIN users ON workers.user_id = users.id;

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
    // fetch single worker by id
    const workerId = req.params.id;
    const [workers] = await pool.execute(
      'SELECT * FROM workers WHERE id = ?',
      [workerId]
    );
    res.json(workers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWorkerProfile,
  getAllWorkers,
  getWorkerById
};





