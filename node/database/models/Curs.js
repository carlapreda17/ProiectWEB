const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const Curs = sequelize.define("Curs", {
    id_curs: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nume_materie: Sequelize.STRING,
    descriere:Sequelize.STRING,
    nume_profesor:Sequelize.STRING
});
module.exports = Curs;