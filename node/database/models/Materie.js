const Sequelize = require('sequelize');
const sequelize = require('../database');

const Materie = sequelize.define('Materie', {
    id_materie: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nume: Sequelize.STRING,
    id_facultate:{
        type:Sequelize.INTEGER,
        references:{
            model:'Facultati',
            key:'id_facultate'
        }
    },
    an:{
        type:Sequelize.INTEGER,
        references: {
            model:'Utilizatori',
            key:'an'
        },
        allowNull: true

    },
    poza: Sequelize.STRING
}, {
    tableName: 'Materii',
    timestamps: false,
});

module.exports = Materie;