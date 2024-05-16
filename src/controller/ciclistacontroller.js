const Ciclistaservices = require('../services/ciclistaservices');
const Ciclista = require('../model/ciclistamodel');

class CiclistaController {

  async cadastrarCiclista(ciclistaData) {
    try {
      const novoCiclista = await servico.verificarCiclista(ciclistaData);
      return novoCiclista;
    } catch (error) {
      console.error('Erro ao cadastrar ciclista:', error);
      throw new Error('Erro ao cadastrar ciclista');
    }
  }

  async verificaEmailExistente(email) {
    try {
      const ciclista = await Ciclista.findOne({ where: { email } });
      return ciclista !== null; 
    } catch (error) {
      console.error('Erro ao verificar e-mail', error);
      throw new Error('Erro ao verificar e-mail');
    }
  }

  async ativarCadastroCiclista(idCiclista) {
    try {
      await servico.ativarCadastroCiclista(idCiclista);
      return `Cadastro ativado para o ciclista com ID: ${idCiclista}`;
    } catch (error) {
      throw new Error('Erro ao ativar cadastro do ciclista');
    }
  }
  
  async getCiclistaById(idCiclista) {
    try {
      const ciclista = await servico.getCiclistaById(idCiclista);
      return ciclista;
    } catch (error) {
      throw new Error('Erro ao buscar ciclista por ID');
    }
  }
  
  async alterarCiclista(idCiclista, novosDados) {
    try {
      const ciclistaAlterado = await servico.alterarCiclista(idCiclista, novosDados);
      return ciclistaAlterado;
    } catch (error) {
      throw new Error('Erro ao alterar dados do ciclista');
    }
  }
  
  async verificaPermissaoAluguel(idCiclista) {
    try {
      // precisar do micro de aluguel 
    } catch (error) {
      throw new Error('Erro ao verificar permissão de aluguel');
    }
  }
  
  async getBicicletaAlugada(idCiclista) {
    try {
      // precisar do micro de aluguel 
    } catch (error) {
      throw new Error('Erro ao obter bicicleta alugada pelo ciclista');
    }
  }
  async getCartaoDeCredito(idCiclista) {
    try {
      const cartao = await servico.getCartao(idCiclista);
      return cartao;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao recuperar dados do cartão de crédito do ciclista');
    }
  }

  
  async alterarCartaoDeCredito(idCiclista, novosDadosCartao) {
    try {
      const cartaoAtualizado = await servico.alterarCartaoDeCredito(idCiclista, novosDadosCartao);
      return cartaoAtualizado;
    } catch (error) {
      console.error('Erro ao alterar dados do cartão de crédito do ciclista:', error);
      throw new Error('Erro ao alterar dados do cartão de crédito do ciclista');
    }
  }

}

module.exports = CiclistaController; 