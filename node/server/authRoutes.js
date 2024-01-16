const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');
const Facultate = require('../database/models/Facultate');

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

        const {nume, prenume, facultate, id_facultate, an} = user;

        const {dataValues: {nume_facultate}} = await Facultate.findOne({
            where: {
                id_facultate: id_facultate
            }
        })


        const parolaValida = bcrypt.compareSync(parola, user.dataValues.parola);
        if (!parolaValida) {
            return res.status(403).json({success: false, message: "Not the same password", data: {}});
        }

        const token = jwt.sign({id: user.dataValues.id_utilizator}, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        });

        return res.status(200).json({success: true, message: "User logged in", data: {'token': token, 'prenume': prenume, 'email': email, 'nume':nume,'facultate':nume_facultate, 'an':an}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.put('/changePassword', async(req, res) => {
    try {
        const {email, newPassword} = req.body;

        const user = await Utilizator.scope(null).findOne({
            where: {
                email: email
            }
        });

        const samePassword = bcrypt.compareSync(newPassword, user.dataValues.parola);
        if(samePassword) {
            return res.status(403).json({success: false, message: "New password cannot be the same as the old one.", data: {}});
        } else {
            const salt = bcrypt.genSaltSync(10);
            const newHashedPassword = bcrypt.hashSync(newPassword, salt);
            await user.update({parola: newHashedPassword});

            return res.status(200).json({success: true, message: "Password changed.", data:{}});
        }
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }

});

module.exports = router;