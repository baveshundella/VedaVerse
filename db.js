const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',           // use your MySQL username
    password: 'bavesh1234', // use your MySQL password
    database: 'newdb'       // your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db; // Export the connection to use in other files
