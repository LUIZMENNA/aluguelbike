const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

class Funcionario extends Model { }

Funcionario.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER
  },
  funcao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senhaHash: {
    type: DataTypes.STRING, // Armazenar o hash da senha
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Funcionario',
  hooks: {
    beforeCreate: async (funcionario) => {
      // Hash da senha antes de criar o registro
      const hash = await bcrypt.hash(funcionario.senhaHash, 10); // 10 é o custo de hash, quanto maior, mais seguro e mais lento
      funcionario.senhaHash = hash;
    }
  }
});

module.exports = Funcionario;