const AluguelService = require('../services/aluguelservices');
const aluguelService = new AluguelService();

class AluguelController {
  async realizarAluguel(dadosAluguel) {
    try {
      const novoAluguel = await aluguelService.alugarBicicleta(dadosAluguel.idCiclista);
      return novoAluguel;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao realizar o aluguel');
    }
  }
}
module.exports = AluguelController;