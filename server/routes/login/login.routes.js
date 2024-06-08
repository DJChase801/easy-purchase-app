const express = require('express');
const db = require('../../db/database');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        ({ email, password } = req.query);

        const program = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM program WHERE email = ? AND password = ?', [email, password], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
        res.status(200).json({ success: true, program: program });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


router.get('/super', async (req, res) => {
    try {
        const programs = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM program;', (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
        res.status(200).json({ success: true, programs: programs });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/super', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO program (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        const programs = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM program;', (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
        res.status(200).json({ success: true, programs: programs });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
