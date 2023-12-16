const Sequelize = require('sequelize');
const sequelize = require('../database');

const Grup = sequelize.define('Grup', {
    id_grup: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nume: Sequelize.STRING
}, {
    tableName: 'Grupuri',
    timestamps: false,
});

module.exports = Grup;