const express = require('express');
const { Program } = require('../../models');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { email, password } = req.query;

        const program = await Program.findOne({
            where: {
                email: email,
                password: password
            }
        });

        res.status(200).json({ success: true, program: program });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/super', async (req, res) => {
    try {
        const programs = await Program.findAll();

        res.status(200).json({ success: true, programs: programs });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/super', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await Program.create({
            name: name,
            email: email,
            password: password
        });

        const programs = await Program.findAll();

        res.status(200).json({ success: true, programs: programs });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
