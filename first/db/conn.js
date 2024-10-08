const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'webscraper16',
    password: '0tTQz8c47D4C3aUM',
    database: 'db'
});


const testConnection = async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Database connected successfully. Test query result:', rows[0].result);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

testConnection(); 

module.exports = pool; 
