const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || "Ballu@12345",
    database: process.env.DB_NAME || 'workify_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
async function verifyConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection verified successfully.');
        connection.release();
    } catch (error) {
        console.error('Error verifying database connection:', error);
        process.exit(1);
    }
}

verifyConnection();

module.exports = pool;