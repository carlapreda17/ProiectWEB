const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const AtasamentSeminar = sequelize.define("AtasamentSeminar", {
    id_atasamentSeminar: {
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
    link:Sequelize.STRING,
    data:Sequelize.DATE
});
module.exports = AtasamentSeminar;