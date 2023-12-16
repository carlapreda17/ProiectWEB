const Sequelize = require('sequelize');
const sequelize = require('../database');

const Seminar = sequelize.define('Seminar', {
    id_seminar: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_materie: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Materie',
            key: 'id_materie',
        }
    },

    nume_materie: Sequelize.STRING,
    nume_profesor: Sequelize.STRING,
    descriere: Sequelize.TEXT
}, {
    tableName: 'Seminare',
    timestamps: false,
});

module.exports = Seminar;