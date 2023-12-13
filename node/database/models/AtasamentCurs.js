const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const AtasamentCurs = sequelize.define("AtasamentCurs", {
    id_atasamentCurs: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_utilizator: {
        type:Sequelize.INTEGER,
        references: 'Users.js',
        referencesKey: 'id_user'
    },
    id_curs:{
        type:Sequelize.INTEGER,
        references: 'Curs.js',
        referencesKey: 'id_curs'
    },
    nume_materie: Sequelize.STRING,
    link:Sequelize.STRING,
    data:Sequelize.DATE
});
module.exports = AtasamentCurs;