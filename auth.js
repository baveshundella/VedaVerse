const express = require('express');
const db = require('./db'); // Import the database connection
const router = express.Router();

// Signup route
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)'; // Ensure you have a users table
    
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User created', userId: result.insertId });
    });
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user: results[0] });
    });
});

module.exports = router; // Export the router to use in the main server file
// Signup route
router.post('/signup', async (req, res) => {
    // ...
});

// Login route
router.post('/login', async (req, res) => { // Add async here
    // ...
});
