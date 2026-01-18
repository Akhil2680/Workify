const bcrypt = require('bcryptjs');
const pool = require('../config/db');
// const errorHandler = require('../middlewares/errorHandler');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res, next) => {
  try {
    // 1. Extract data from request body
    const { name, email, password, role } = req.body;

    // 2. Validate required fields
    if (!name || !email || !password || !role) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }
    // 3. Check if user already exists
    const [existingUser] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      res.status(400);
      throw new Error('User already exists');
    }

    // 4. Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Insert user into database
    const [newUser] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    // 6. Send success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });

  } catch (error) {
    next(error); // Global error handler
  }
};

//login user function can be added here similarly

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check email & password present
    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    // 2. Find user by email
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const user = users[0];

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // 4. Generate JWT (next step)
    const token = jwt.sign(
  { id: user.id },                 // payload
  process.env.JWT_SECRET,          // secret
  { expiresIn: '1d' }              // expiry
);
    // 5. Send response
    res.status(200).json({
  success: true,
  message: 'Login successful',
  token,
});

    
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };