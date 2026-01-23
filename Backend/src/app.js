const express = require('express');
const app = express();
const notFound = require('./middlewares/Notfound');
const errorHandler = require('./middlewares/errorHandler');
const { protect } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');

app.use(express.json());

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



app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app; 