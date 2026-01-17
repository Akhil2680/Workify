const express = require('express');
const app = express();
app.use(express.json());

const notFound = require('./middlewares/Notfound');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');


app.get('/', (req, res) => {
    res.send('welcome to Workify');
});

app.use('/api/auth', authRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app; 