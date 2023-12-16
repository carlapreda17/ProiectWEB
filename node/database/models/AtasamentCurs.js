const Sequelize = require('sequelize');
const sequelize = require('../database');

const AtasamentCurs = sequelize.define('AtasamentCurs', {
    id_atasament_curs: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_utilizator: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Utilizator',
            key: 'id_utilizator',
        }
    },
    id_notita_curs: {
        type: Sequelize.INTEGER,
        references: {
            model: 'NotitaCurs',
            key: 'id_notita_curs',
        },
        allowNull: true
    },
    id_curs: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Curs',
            key: 'id_curs',
        },
        allowNull: true
    },
    nume_materie: Sequelize.STRING,
    tip: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriere: Sequelize.TEXT,
    cale_fisier: Sequelize.STRING,
    url: Sequelize.STRING
}, {
    tableName: 'AtasamenteCurs',
    timestamps: false,
});

module.exports = AtasamentCurs;

//cale_fisier - Calea unde este stocat fișierul atașat (pentru fișiere încărcate).
// url - URL-ul sursă pentru conținut integrat (de exemplu, link către un video YouTube).