const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const User = sequelize.define("User", {
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_grup: {
        type: Sequelize.INTEGER,
        references:"Grup.js",
        referencesKey:"id_grup"
    },
    nume: Sequelize.STRING,
    prenume: Sequelize.STRING,
    parola: Sequelize.STRING,
    email: Sequelize.STRING,
    telefon:Sequelize.INTEGER,
    facultate: Sequelize.STRING
});
module.exports = User;