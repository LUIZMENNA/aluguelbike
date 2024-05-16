const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ciclista = require('./ciclistamodel');

class Aluguel extends Model { }

Aluguel.init({
  bicicleta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  horarioInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horarioFim: {
    type: DataTypes.DATE
  },
  cobranca: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  idCiclista: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ciclista,
      key: 'idCiclista'
    }
  }
}, {
  sequelize,
  modelName: 'Aluguel'
});

module.exports = Aluguel;
