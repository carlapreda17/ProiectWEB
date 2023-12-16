const Sequelize = require('sequelize');
const sequelize = require('../database');

const AtasamentSeminar = sequelize.define('AtasamentSeminar', {
    id_atasament_seminar: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_utilizator: {
        type:Sequelize.INTEGER,
        references: {
            model: 'Utilizator',
            key: 'id_utilizator',
        }
    },
    id_notita_seminar: {
        type: Sequelize.INTEGER,
        references: {
            model: 'NotitaSeminar',
            key: 'id_notita_seminar',
        },
        allowNull: true
    },
    id_seminar: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Seminar',
            key: 'id_seminar',
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
    tableName: 'AtasamenteSeminar',
    timestamps: false,
});

module.exports = AtasamentSeminar;

//cale_fisier - Calea unde este stocat fișierul atașat (pentru fișiere încărcate).
// url - URL-ul sursă pentru conținut integrat (de exemplu, link către un video YouTube).