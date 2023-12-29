const Sequelize = require('sequelize');
const sequelize = require('../database');

const NotitaCurs = sequelize.define('NotitaCurs', {
    id_notita_curs: {
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
    tableName: 'NotiteCurs',
    timestamps: false,
});

module.exports = NotitaCurs;