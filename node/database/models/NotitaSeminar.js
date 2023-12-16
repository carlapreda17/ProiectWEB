const Sequelize = require('sequelize');
const sequelize = require('../database');

const NotitaSeminar = sequelize.define('NotitaSeminar', {
    id_notita_seminar: {
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
    id_seminar:{
        type:Sequelize.INTEGER,
        references: {
            model: 'Seminar',
            key: 'id_seminar',
        }
    },
    nume_materie: Sequelize.STRING,
    titlu:Sequelize.STRING,
    data:Sequelize.DATE
}, {
    tableName: 'NotiteSeminar',
    timestamps: false,
});

module.exports = NotitaSeminar;