const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const Seminar= sequelize.define("Seminar", {
    id_seminar: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nume_materie: Sequelize.STRING,
    descriere:Sequelize.STRING,
    nume_profesor:Sequelize.STRING
});
module.exports = Seminar;