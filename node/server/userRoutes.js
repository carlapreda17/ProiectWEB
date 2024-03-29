const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');
const Facultate = require('../database/models/Facultate');

router.post('/signUp', async (req, res) => {
    try {
        const {nume, prenume, parola, email, telefon, facultate, an} = req.body;

        const existaUser = await Utilizator.findOne({
            where: {
                'email': email
            }
        });
        if (existaUser) {
            return res.status(409).json({success: false, message: "Email already in use."});
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(parola, salt);

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
        const phoneRegex = /^07\d{8}$/;
        const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        const mailRegex = /^[^@\s]+@stud\.ase\.ro$/;

        let errors = [];

        if (!nameRegex.test(nume)) {
            errors.push("Invalid name.");
        }

        if (!nameRegex.test(prenume)) {
            errors.push("Invalid surrname.");
        }

        if (!passwordRegex.test(parola)) {
            errors.push("Invalid password.");
        }

        if (!mailRegex.test(email)) {
            errors.push("Invalid email.");
        }

        if (!phoneRegex.test(telefon)) {
            errors.push("Invalid phone number.");
        }

        if (errors.length > 0) {
            return res.status(400).json({success: false, message: "The sent data is invalid.", errors: errors});
        }

        const {dataValues: {id_facultate}} = await Facultate.findOne({
            where: {
                nume_facultate: facultate
            }
        });

        await Utilizator.create({
            nume,
            prenume,
            parola: hash,
            email,
            telefon,
            id_facultate,
            an
        });

        return res.status(201).json({success: true, message: 'User added'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

module.exports = router;