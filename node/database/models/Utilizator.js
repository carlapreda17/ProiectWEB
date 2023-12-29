const Sequelize = require('sequelize');
const sequelize = require('../database');

const Utilizator = sequelize.define('Utilizatori', {
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
    an:Sequelize.INTEGER,
    id_facultate: {
        type:Sequelize.INTEGER,
        references: {
            model: 'Facultati',
            key:'id_facultate'
        }
    },
    id_grup: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Grupuri',
            key: 'id_grup',
            allowNull: true
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