const Sequelize = require('sequelize');
const sequelize = require('../database');

const Curs = sequelize.define('Curs', {
    id_curs: {
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
    tableName: 'Cursuri',
    timestamps: false,
});

module.exports = Curs;