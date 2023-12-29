const Grup = require('./models/Grup');
const Utilizator = require('./models/Utilizator');
const Materie = require('./models/Materie');
const NotitaCurs = require('./models/NotitaCurs');
const AtasamentCurs = require('./models/AtasamentCurs');
const NotitaSeminar = require('./models/NotitaSeminar');
const AtasamentSeminar = require('./models/AtasamentSeminar');
const Facultate=require('./models/Facultate');

Facultate.hasMany(Utilizator,{
    foreignKey:'id_facultate'
})

Utilizator.belongsTo(Grup, {
    foreignKey: 'id_grup'
});
Utilizator.belongsTo(Facultate,{
    foreignKey:'id_facultate'
})

Materie.hasMany(Facultate,{
    foreignKey:'id_facultate'
})

Facultate.hasMany(Materie,{
    foreignKey:'id_facultate'
})

Grup.hasMany(Utilizator, {
    foreignKey: 'id_grup'
});

NotitaCurs.belongsTo(Utilizator, {
    foreignKey: 'id_utilizator'
});
Utilizator.hasMany(NotitaCurs, {
    foreignKey: 'id_utilizator'
});

AtasamentCurs.belongsTo(NotitaCurs, {
    foreignKey: 'id_notita_curs'
});
NotitaCurs.hasMany(AtasamentCurs, {
    foreignKey: 'id_notita_curs'
});

AtasamentCurs.belongsTo(Utilizator, {
    foreignKey: 'id_utilizator'
});
Utilizator.hasMany(AtasamentCurs, {
    foreignKey: 'id_utilizator'
});
NotitaSeminar.belongsTo(Utilizator, {
    foreignKey: 'id_utilizator'
});
Utilizator.hasMany(NotitaSeminar, {
    foreignKey: 'id_utilizator'
});

module.exports = {
    Facultate,
    Grup,
    Utilizator,
    Materie,
    NotitaCurs,
    AtasamentCurs,
    NotitaSeminar,
    AtasamentSeminar
};