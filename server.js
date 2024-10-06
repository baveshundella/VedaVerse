// Import necessary packages
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth'); // Ensure this path is correct
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes); // API endpoint for auth routes

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin', // use your MySQL username
    password: 'bavesh1234', // use your MySQL password
    database: 'newdb'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define routes here or import them from other files
// Example of signup route
app.post('/api/auth/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'User created', userId: result.insertId });
    });
});

// Opportunities route
app.get('/api/opportunities', (req, res) => {
    // Fetch opportunities from the database
    const query = 'SELECT * FROM opportunities';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching opportunities' });
        }
        res.json(results);
    });
});

// Mentorship programs route
app.get('/api/mentorship-programs', (req, res) => {
    // Fetch mentorship programs from the database
    const query = 'SELECT * FROM mentorship_programs';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching mentorship programs' });
        }
        res.json(results);
    });
});

// Project collaborations route
app.get('/api/project-collaborations', (req, res) => {
    // Fetch project collaborations from the database
    const query = 'SELECT * FROM project_collaborations';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching project collaborations' });
        }
        res.json(results);
    });
});

// Example of login route
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password); // Compare password with hashed password
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
