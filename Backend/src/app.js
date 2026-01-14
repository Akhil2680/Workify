const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('welcome to Workify');
});

module.exports = app; 