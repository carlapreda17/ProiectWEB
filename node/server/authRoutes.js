const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');

router.post('/login', async(req, res) => {
    try {
        const {email, parola} = req.body;

        const user = await Utilizator.scope(null).findOne({
            where: {
                email: email
            }
        });

        if(!user) {
            return res.status(404).json({success: false, message: "User not found", data: {}});
        }

        const {nume, prenume, facultate} = user;

        const parolaValida = bcrypt.compareSync(parola, user.dataValues.parola);
        if (!parolaValida) {
            return res.status(403).json({success: false, message: "Not the same password", data: {}});
        }

        const token = jwt.sign({id: user.dataValues.id_utilizator}, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        });
        console.log(token);
        return res.status(200).json({success: true, message: "User logged in", data: {'token': token, 'prenume': prenume, 'nume':nume,'facultate':facultate}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.get('/authenticated', async(req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decoded);
        const user = await Utilizator.scope(null).findOne({
            where: {
                id_utilizator: decoded.id
            }
        });
        console.log(user);
        const {prenume} = user;
        return res.status(200).json({success: true, message: "User authenticated", data: {'prenume': prenume}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

module.exports = router;