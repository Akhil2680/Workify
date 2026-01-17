const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const app = require('./app');
const port =  3000;

const pool = require('./config/db');
console.log('DB NAME:', process.env.DB_NAME);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

