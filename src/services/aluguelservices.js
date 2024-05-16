class AluguelService {
    async alugarBicicleta(idCiclista) {
      try {
        const aluguelExistente = await this.verificarAluguelAtivo(idCiclista);
        if (aluguelExistente) {
          throw new Error('O ciclista já tem um aluguel ativo');
        }
  
        await this.verificarCadastroAtivo(idCiclista);
        const cobranca = 10.00;
  
        const aluguel = await this.registrarAluguel(idCiclista, cobranca);
  
    
        // await this.enviarEmailAluguel(aluguel);
        return aluguel;
      } catch (error) {
        console.error('Erro ao alugar bicicleta:', error);
        throw new Error('Erro ao alugar bicicleta');
      }
    }
  
    async verificarAluguelAtivo(idCiclista) {
        try {
          const aluguelAtivo = await Aluguel.findOne({
            where: {
              ciclista: idCiclista,
              horaFim: null 
            }
          });
          return !!aluguelAtivo;
        } catch (error) {
          console.error('Erro ao verificar aluguel ativo:', error);
          throw new Error('Erro ao verificar aluguel ativo');
        }
      }

  
    async verificarCadastroAtivo(idCiclista) {
        try {
          const ciclista = await Ciclista.findByPk(idCiclista);
          if (!ciclista) {
            throw new Error('Ciclista não encontrado');
          }
          if (!ciclista.ativo) {
            throw new Error('Cadastro do ciclista não está ativo');
          }
        } catch (error) {
          console.error('Erro ao verificar cadastro ativo do ciclista:', error);
          throw new Error('Erro ao verificar cadastro ativo do ciclista');
        }
      }
  
    async registrarAluguel(idCiclista, cobranca) {
      return {
        bicicleta: 'numeroBicicleta', 
        horaInicio: new Date(),
        cobranca: cobranca,
        ciclista: idCiclista,
      };
    }
  
    async enviarEmailAluguel(aluguel) {
      // fazer a implementação de outro microserviço
    }
  }
  
  module.exports = AluguelService;