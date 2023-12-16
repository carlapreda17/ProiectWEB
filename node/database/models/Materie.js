const Sequelize = require('sequelize');
const sequelize = require('../database');

const Materie = sequelize.define('Materie', {
    id_materie: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nume: Sequelize.STRING,
}, {
    tableName: 'Materii',
    timestamps: false,
});

module.exports = Materie;