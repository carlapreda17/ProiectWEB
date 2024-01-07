const express = require('express');
const multer = require('multer');
const {extname} = require("path");
const router = express.Router();

const Utilizator = require('../database/models/Utilizator');
const Materie = require('../database/models/Materie');
const Facultate = require("../database/models/Facultate");
const NotitaSeminar = require('../database/models/NotitaSeminar');
const NotitaCurs = require('../database/models/NotitaCurs');
const AtasamentCurs=require('../database/models/AtasamentCurs');
const AtasamentSeminar=require('../database/models/AtasamentSeminar');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

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

router.get('/getMaterie', async (req, res) => {
    try {
        const {id_materie} = req.query;

        const materie = await  Materie.findOne({
            where: {
                id_materie: id_materie,
            }
        });

        if (!materie) {
            return res.status(404).json({success: false, message: 'Materia nu a fost găsită'});
        }

        return res.status(201).json({success: true, message: {'materie': materie}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.post('/addNotita', async (req, res) => {
    try {
        const { email, title, tip, materie, note } = req.body;

        let errors = [];
        if(note===null)
        {
            errors.push('Notita inexistenta!')
        }
        if(title===null)
        {
            errors.push("Adauga titlu!")
        }
        if (errors.length > 0) {
            return res.status(400).json({success: false, message: "The sent data is invalid.", errors: errors});
        }

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

        return res.status(201).json({success: true, message: 'Notita added', data:{'date':date}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.post('/addAtasament', upload.single('fisier'), async (req, res) => {
    try{
        const { tipMaterie, email, tip, descriere, materie, note, url, date } = req.body;
        let cale_fisier;
        let numeFisier;

        if(req.file) {
            cale_fisier = req.file.path;
            numeFisier = req.file.originalname;
        }

        if(!numeFisier) {
            numeFisier = url;
        }

        const {dataValues: {id_utilizator}}= await Utilizator.findOne({
            where:{
                email:email
            }
        })

        if(tipMaterie === 'Seminar') {
            const notaSeminar = await NotitaSeminar.findOne({
                    where: {
                        data:date
                    }
                });

            if(notaSeminar) {
                const {dataValues: {id_notita_seminar}}= await NotitaSeminar.findOne({
                    where:{
                        data:date
                    }
                });

                await AtasamentSeminar.create({
                    id_utilizator,
                    id_notita_seminar:id_notita_seminar,
                    nume_materie: materie,
                    tip:tip,
                    descriere:descriere,
                    nume_fisier: numeFisier,
                    cale_fisier:cale_fisier,
                    url
                });
            }
        } else
            if(tipMaterie === 'Curs') {
                const notaCurs = await NotitaCurs.findOne({
                            where: {
                                data:date
                            }
                        });

                if(notaCurs) {
                    const {dataValues: {id_notita_curs}}= await NotitaCurs.findOne({
                        where:{
                            data:date
                        }
                    });

                    await AtasamentCurs.create({
                        id_utilizator,
                        id_notita_curs:id_notita_curs,
                        nume_materie: materie,
                        tip:tip,
                        descriere:descriere,
                        nume_fisier: numeFisier,
                        cale_fisier:cale_fisier,
                        url
                    });
                }
        }

        return res.status(201).json({success: true, message: 'Atasament added'});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
})

module.exports = router;