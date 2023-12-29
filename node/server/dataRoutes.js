const express = require('express');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');
const Materie = require('../database/models/Materie');
const Facultate = require("../database/models/Facultate");
const NotitaSeminar = require('../database/models/NotitaSeminar');
const NotitaCurs = require('../database/models/NotitaCurs');

router.get('/getMaterii', async (req, res) => {
    try {
        const {nume_facultate, an} = req.query;

        const {dataValues: {id_facultate}} = await Facultate.findOne({
            where: {
                nume_facultate: nume_facultate
            }
        });

        const materii = await Materie.findAll({
            where: {
                id_facultate: id_facultate,
                an: an
            }
        });

        return res.status(201).json({success: true, message: {'materii': materii}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.post('/addNotita', async (req, res) => {
    try {
        const { email, title, tip, materie, note } = req.body;
        const {dataValues: {id_utilizator}} = await Utilizator.findOne({
            where: {
                email: email
            }
        });
        const date = new Date();

        if(tip === 'Curs') {
            await NotitaCurs.create({
                id_utilizator,
                nume_materie: materie,
                titlu: title,
                content: note,
                data: date
            });
        } else if(tip === 'Seminar') {
            await NotitaSeminar.create({
                id_utilizator,
                nume_materie: materie,
                titlu: title,
                content: note,
                data: date
            });
        }

        return res.status(201).json({success: true, message: 'Notita added'});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

module.exports = router;