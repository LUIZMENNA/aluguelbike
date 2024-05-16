const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Ciclista extends Model { }

Ciclista.init({
    idCiclista: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacionalidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    urlFotoDocumento: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passaporte: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    meioDePagamento: {
        type: DataTypes.JSONB,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Ciclista'
});

module.exports = Ciclista;
