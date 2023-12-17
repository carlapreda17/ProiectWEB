const Grup = require('./models/Grup');
const Utilizator = require('./models/Utilizator');
const Materie = require('./models/Materie');
const Curs = require('./models/Curs');
const NotitaCurs = require('./models/NotitaCurs');
const AtasamentCurs = require('./models/AtasamentCurs');
const Seminar = require('./models/Seminar');
const NotitaSeminar = require('./models/NotitaSeminar');
const AtasamentSeminar = require('./models/AtasamentSeminar');

Utilizator.belongsTo(Grup, {
    foreignKey: 'id_grup'
});
Grup.hasMany(Utilizator, {
    foreignKey: 'id_grup'
});

Materie.hasOne(Curs, {
    foreignKey: 'id_materie'
});
Curs.belongsTo(Materie, {
    foreignKey: 'id_materie'
});

Materie.hasOne(Seminar, {
    foreignKey: 'id_materie'
});
Seminar.belongsTo(Materie, {
    foreignKey: 'id_materie'
});

NotitaCurs.belongsTo(Curs, {
    foreignKey: 'id_curs'
});
Curs.hasMany(NotitaCurs, {
    foreignKey: 'id_curs'
});

NotitaCurs.belongsTo(Utilizator, {
    foreignKey: 'id_utilizator'
});
Utilizator.hasMany(NotitaCurs, {
    foreignKey: 'id_utilizator'
});

AtasamentCurs.belongsTo(Curs, {
    foreignKey: 'id_curs'
});
Curs.hasMany(AtasamentCurs, {
    foreignKey: 'id_curs'
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

NotitaSeminar.belongsTo(Seminar, {
    foreignKey: 'id_seminar'
});
Seminar.hasMany(NotitaSeminar, {
    foreignKey: 'id_seminar'
});

NotitaSeminar.belongsTo(Utilizator, {
    foreignKey: 'id_utilizator'
});
Utilizator.hasMany(NotitaSeminar, {
    foreignKey: 'id_utilizator'
});

AtasamentSeminar.belongsTo(Seminar, {
    foreignKey: 'id_seminar'
});
Seminar.hasMany(AtasamentSeminar, {
    foreignKey: 'id_seminar'
});

module.exports = {
    Grup,
    Utilizator,
    Materie,
    Curs,
    NotitaCurs,
    AtasamentCurs,
    Seminar,
    NotitaSeminar,
    AtasamentSeminar
};