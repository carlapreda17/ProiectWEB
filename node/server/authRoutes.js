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

        const parolaValida = bcrypt.compareSync(parola, user.dataValues.parola);
        if (!parolaValida) {
            return res.status(404).json({success: false, message: "Not the same password", data: {}});
        }

        const token = jwt.sign({id: user.dataValues.id_utilizator}, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        });
        return res.status(200).json({success: true, message: "User logged in", data: token});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

module.exports = router;