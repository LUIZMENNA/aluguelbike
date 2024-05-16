const Funcionario = require('../model/funcionariomodel');

class funcionarioController {

  async cadastrarFuncionario(funcJSON) {
    try {
      const novoFuncionario = await create(funcJSON)
      return novoFuncionario
    } catch (error) {
      throw new Error(error)
    }
  }

  async getFuncionarioById(id) {
    try {
      const funcionario = await findByPk(id)
      return funcionario;
    } catch (error) {
      throw new Error('Erro ao buscar ciclista por ID')
    }
  }

  async getFuncionarios() {
    try {
      const funcionarios = await findAll()
      return funcionarios
    } catch (error) {
      throw new Error('Erro ao buscar os funcionarios')
    }
  }

  async deletarFuncionario(funcId) {
    try {
      const funcionario = await destroy({
        where: {
          id: funcId
        }
      })
    } catch (error) {
      throw new Error('Erro ao deletar o funcionario')
    }
  }

  async alterarFuncionario(novoFuncionario, funcId) {
    try {

      const [numRowsUpdated, [updatedUser]] = await update(novoFuncionario, {
        where: {
          id: funcId
        },
        returning: true
      });

      if (numRowsUpdated === 0) {
        console.log("Nenhum funcionário encontrado com o ID fornecido.");
        return null;
      } else {
        console.log("Funcionário atualizado com sucesso:", updatedUser.toJSON());
        return updatedUser.toJSON();
      }
    } catch (error) {
      console.error("Erro ao atualizar o funcionário:", error);
      throw error;
    }
  }
}

module.exports = funcionarioController; 