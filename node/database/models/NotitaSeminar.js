const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const NotitaSeminar = sequelize.define("NotitaSeminar", {
    id_notitasSeminar: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_utilizator: {
        type:Sequelize.INTEGER,
        references: 'Users.js',
        referencesKey: 'id_user'
    },
    id_seminar:{
        type:Sequelize.INTEGER,
        references: 'Seminar.js',
        referencesKey: 'id_seminar'
    },
    nume_materie: Sequelize.STRING,
    titlu:Sequelize.STRING,
    data:Sequelize.DATE
});
module.exports = NotitaSeminar;