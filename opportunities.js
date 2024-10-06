const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all opportunities
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM opportunities');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching opportunities', error });
    }
});

// Create a new opportunity
router.post('/', async (req, res) => {
    const { title, description, company, type } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO opportunities (title, description, company, type) VALUES (?, ?, ?, ?)',
            [title, description, company, type]
        );
        res.status(201).json({ id: result.insertId, message: 'Opportunity created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating opportunity', error });
    }
});

// Add more routes for updating and deleting opportunities

module.exports = router;