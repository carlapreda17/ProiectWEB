const express = require('express');

const router = express.Router();

const Utilizator = require('../database/models/Utilizator');
const NotitaSeminar = require('../database/models/NotitaSeminar');
const NotitaCurs = require('../database/models/NotitaCurs');


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
})
module.exports = router;