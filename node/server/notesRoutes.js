const express = require('express');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');
const NotitaSeminar = require('../database/models/NotitaSeminar');
const NotitaCurs = require('../database/models/NotitaCurs');
const AtasamentCurs = require('../database/models/AtasamentCurs');
const AtasamentSeminar = require('../database/models/AtasamentSeminar');
const {Materie} = require("../database/modelsRelations");


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

        console.log(nume, id_utilizator)

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
        notiteSeminar.filter(notita => notita.nume_materie===nume);
        notiteCurs.filter(notita => notita.nume_materie===nume);
        const notite = notiteSeminar.concat(notiteCurs);

        return res.status(201).json({success: true, message: {'notite': notite}});
    } catch(error) {
        console.error('Error:', error);
        res.status(500).json({success: false, message: 'An error occurred'});
    }
});

module.exports = router;