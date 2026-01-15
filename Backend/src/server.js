const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const port =  3000;

const pool = require('./config/db');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

