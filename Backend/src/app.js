const express = require('express');
const app = express();
app.use(express.json());
// middlewares
const notFound = require('./middlewares/Notfound');
const errorHandler = require('./middlewares/errorHandler');
const { protect } = require('./middlewares/authMiddleware');

// routes
const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


// test route
app.get('/', (req, res) => {
    res.send('welcome to Workify');
});

app.get('/api/protected', protect, (req, res) => {
    res.json({
        success: true,
        message: 'You are authorized',
        user: req.user
    });
});


// use routes
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// not found + error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app; 