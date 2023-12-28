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
            model: 'Utilizatori',
            key: 'id_utilizator',
        }
    },
    nume_materie: Sequelize.STRING,
    titlu:Sequelize.STRING,
    content: Sequelize.TEXT('long'),
    data:Sequelize.DATE
}, {
    tableName: 'NotiteSeminar',
    timestamps: false,
});

module.exports = NotitaSeminar;