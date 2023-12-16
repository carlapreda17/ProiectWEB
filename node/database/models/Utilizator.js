const Sequelize = require('sequelize');
const sequelize = require('../database');

const Utilizator = sequelize.define('Utilizator', {
    id_utilizator: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nume: Sequelize.STRING,
    prenume: Sequelize.STRING,
    parola: Sequelize.STRING,
    email: Sequelize.STRING,
    telefon:Sequelize.STRING,
    facultate: Sequelize.STRING,
    id_grup: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Grup',
            key: 'id_grup',
        }
    },
    }, {
    defaultScope: {
        attributes: {
            exclude: 'parola'
        }
    },
    tableName: 'Utilizatori',
    timestamps: false,
});

module.exports = Utilizator;