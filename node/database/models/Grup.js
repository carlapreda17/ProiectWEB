const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const Grup = sequelize.define("Grup", {
    id_grup: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nume: Sequelize.STRING
});
module.exports = Grup;