const express = require('express');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');
const NotitaSeminar = require('../database/models/NotitaSeminar');
const NotitaCurs = require('../database/models/NotitaCurs');
const AtasamentCurs = require('../database/models/AtasamentCurs');
const AtasamentSeminar = require('../database/models/AtasamentSeminar');
const {Materie} = require("../database/modelsRelations");
const {content} = require("../../client/ase-notes/tailwind.config");


router.get('/getNotite',async (req,res)=>{
    try{
        const {email}=req.query;

        const {dataValues: {id_utilizator}} = await Utilizator.findOne({
            where: {
                email:email
            }
        });

        const notiteCurs=await NotitaCurs.findAll({
            where:{
                id_utilizator:id_utilizator
            }
        })

        const notiteSeminar=await NotitaSeminar.findAll({
            where:{
                id_utilizator:id_utilizator
            }
        })

        const notite = notiteCurs.concat(notiteSeminar)
        return res.status(201).json({success: true, message: {'notite': notite}});
    }catch (error){
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.get('/getAtasamente', async(req, res) => {
    try {
        const { email } = req.query;

        const { dataValues: { id_utilizator } } = await Utilizator.findOne({
            where: {
                email:email
            }
        });

        const atasamenteCurs=await AtasamentCurs.findAll({
            where: {
                id_utilizator: id_utilizator
            }
        });

        const atasamenteSeminar=await AtasamentSeminar.findAll({
            where: {
                id_utilizator: id_utilizator
            }
        });

        const atasamente = atasamenteCurs.concat(atasamenteSeminar);
        return res.status(201).json({success: true, message: {'atasamente': atasamente}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.get('/getAtasamentePerNotita', async(req, res) => {
    try {
        const { email, id_notita_curs = null, id_notita_seminar = null } = req.query;

        const { dataValues: { id_utilizator } } = await Utilizator.findOne({
            where: {
                email:email
            }
        });

        let atasamente;
        if(id_notita_curs !== null) {
            const id = Number(id_notita_curs);
            atasamente = await AtasamentCurs.findAll({
                where: {
                    id_utilizator: id_utilizator,
                    id_notita_curs: id
                }
            });
        }

        if(id_notita_seminar !== null) {
            const id = Number(id_notita_seminar);
            atasamente = await AtasamentSeminar.findAll({
                where: {
                    id_utilizator: id_utilizator,
                    id_notita_seminar: id
                }
            });
        }
        return res.status(201).json({success: true, message: {'atasamente': atasamente}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.get('/getNotiteMaterie', async(req, res) => {
    try {
        const {id_materie, email} = req.query;

        const {dataValues: {id_utilizator}} = await Utilizator.findOne({
            where: {
                email: email
            }
        });

        const {dataValues: {nume}} = await Materie.findOne({
            where: {
                id_materie: id_materie
            }
        });

        const notiteSeminar = await NotitaSeminar.findAll({
            where: {
                id_utilizator: id_utilizator
            }
        });

        const notiteCurs = await NotitaCurs.findAll({
            where: {
                id_utilizator: id_utilizator
            }
        });

        const filteredSeminar = notiteSeminar.filter((notita) => {
            const {dataValues: {nume_materie}} = notita;

            return nume_materie===nume;
        });

        const filteredCurs = notiteCurs.filter((notita) => {
            const {dataValues: {nume_materie}} = notita;

            return nume_materie===nume;
        });

        const notite = filteredSeminar.concat(filteredCurs);

        return res.status(201).json({success: true, message: {'notite': notite}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

router.get('/getNotitaCurs', async(req,res)=>{
    try{

        const {id_notita_curs}=req.query;

        const notiteCurs = await NotitaCurs.findOne({
            where: {
                id_notita_curs: id_notita_curs
            }
        });

        if (notiteCurs) {
            res.status(200).json({ success: true, message: {'notita':notiteCurs} });
        } else {
            res.status(404).json({ success: false, message: 'Notița nu a fost găsită' });
        }

    }catch(error)
    {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
})

router.get('/getNotitaSeminar', async(req,res)=>{
    try{
        const {id_notita_seminar}=req.query;

        const notiteSeminar= await NotitaSeminar.findOne({
            where: {
                id_notita_seminar: id_notita_seminar
            }
        });

        if (notiteSeminar) {
            res.status(200).json({ success: true, message: {'notita':notiteSeminar} });
        } else {
            res.status(404).json({ success: false, message: 'Notița nu a fost găsită' });
        }

    }catch(error)
    {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
})
router.put('/updateNotitaCurs/:id', async (req, res) => {
    try {
        const notitaId = req.params.id;
        const {content} = req.body;

        const updatedNotita = await NotitaCurs.update({content}, {
            where: { id_notita_curs: notitaId },

        })
        if (updatedNotita[0]) {
            res.status(201).json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Notița nu a fost găsită sau nu a fost actualizată' });
        }
    } catch (error) {
        console.error('Eroare la actualizarea notiței:', error);
        throw error;
    }
});

router.put('/updateNotitaSeminar/:id', async (req, res) => {
    try {
        const notitaId = req.params.id;
        const { content } = req.body;

        const updatedNotita = await NotitaSeminar.update({ content }, {
            where: { id_notita_seminar: notitaId },
        });

        if (updatedNotita[0]) {
            res.status(201).json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Notița nu a fost găsită sau nu a fost actualizată' });
        }
    } catch (error) {
        console.error('Eroare la actualizarea notiței:', error);
        res.status(500).json({ success: false, message: 'Eroare la actualizarea notiței' });
    }
});

module.exports = router;