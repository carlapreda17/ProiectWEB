const { Sequelize } = require("sequelize");
const {sequelize} = require("../server");
const NotitaCurs = sequelize.define("NotitaCurs", {
    id_notitaCurs: {
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
    titlu:Sequelize.STRING,
    data:Sequelize.DATE
});
module.exports = NotitaCurs;