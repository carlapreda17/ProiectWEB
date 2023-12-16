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
            model: 'Utilizator',
            key: 'id_utilizator',
        }
    },
    id_curs:{
        type:Sequelize.INTEGER,
        references: {
            model: 'Curs',
            key: 'id_curs',
        }
    },
    nume_materie: Sequelize.STRING,
    titlu:Sequelize.STRING,
    data:Sequelize.DATE
}, {
    tableName: 'NotiteCurs',
    timestamps: false,
});

module.exports = NotitaCurs;