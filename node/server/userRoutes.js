const express = require('express');
const bcrypt = require('bcrypt');
const sequelize = require('../database/database');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');

router.post('/signUp', async (req, res) => {
    try {
        const {nume, prenume, parola, email, telefon, facultate} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(parola, salt);

        await Utilizator.create({
                nume,
                prenume,
                parola: hash,
                email,
                telefon,
                facultate
            });

        return res.status(201).json({success: true, message: 'User added'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

module.exports = router;