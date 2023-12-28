const Sequelize = require('sequelize');
const sequelize = require('../database');

const Facultate = sequelize.define('Facultate', {
    id_facultate: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nume_facultate: Sequelize.STRING
}, {
    tableName: 'Facultati',
    timestamps: false,
});

module.exports = Facultate;