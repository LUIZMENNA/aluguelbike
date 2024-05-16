const Ciclista = require('../model/ciclistamodel');

class Service {
  async verificaEmailExistente(email) {
    try {
      const ciclista = await Ciclista.findOne({ where: { email } });
      return ciclista !== null;
    } catch (error) {
      console.error('Erro ao verificar e-mail', error);
      throw new Error('Erro ao verificar e-mail');
    }
  }

  async verificarCiclista(ciclistaData) {
    try {
      const emailExistente = await this.verificaEmailExistente(ciclistaData.email);
      if (emailExistente) {
        throw new Error('Email já cadastrado');
      }
      const erroValidacao = await this.validarDadosCiclista(ciclistaData); // Esperar a validação
      if (erroValidacao) {
        throw new Error(erroValidacao);
      }

      if (ciclistaData.senha !== ciclistaData.confirmarSenha) {
        throw new Error('As senhas não correspondem');
      }

      const novoCiclista = await Ciclista.create(ciclistaData);
      return novoCiclista;
    } catch (error) {
      console.error('Erro ao cadastrar ciclista:', error);
      throw new Error('Erro ao cadastrar ciclista');
    }
  }


  async validarDadosCiclista(ciclistaData) {
    const { nome, nascimento, cpf, nacionalidade, urlFotoDocumento, senha, passaporte, meioDePagamento } = ciclistaData;

    if (!nome) {
      return 'Nome é obrigatório';
    }
    if (!nascimento || isNaN(new Date(nascimento))) {
      return 'Data de nascimento inválida';
    }
    if (!cpf || !this.validarCPF(cpf)) {
      return 'CPF inválido';
    }
    if (!nacionalidade) {
      return 'Nacionalidade é obrigatória';
    }
    if (!urlFotoDocumento) {
      return 'URL da foto do documento é obrigatória';
    }
    if (!senha) {
      return 'Senha é obrigatória';
    }
    if (passaporte) {
      if (!passaporte.numero || !passaporte.validade || !passaporte.pais) {
        return 'Dados do passaporte incompletos';
      }
    }
    if (meioDePagamento) {
      if (!meioDePagamento.nomeTitular || !meioDePagamento.numero || !meioDePagamento.validade || !meioDePagamento.cvv) {
        return 'Dados do meio de pagamento incompletos';
      }
    }
    return null;
  }

  async validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
      return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
      return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

    return parseInt(cpf.charAt(10)) === digitoVerificador2;
  }

  async getCiclistaById(idCiclista) {
    try {
      const ciclista = await Ciclista.findByPk(idCiclista);
      if (!ciclista) {
        throw new Error('Ciclista não encontrado');
      }
      return ciclista;
    } catch (error) {
      console.error('Erro ao buscar ciclista por ID:', error);
      throw new Error('Erro ao buscar ciclista por ID');
    }
  }

  async getCartao(idCiclista) {
    try {
      const ciclista = await Ciclista.findByPk(idCiclista);
      if (!ciclista) {
        throw new Error('Ciclista não encontrado');
      }
      return ciclista.meioDePagamento;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao recuperar dados do cartão de crédito do ciclista');
    }
  }

  async alterarCartaoDeCredito(idCiclista, novosDadosCartao) {
    try {
      const ciclista = await this.getCiclistaById(idCiclista);
      if (!ciclista.meioDePagamento) {
        throw new Error('O ciclista não possui um cartão de crédito cadastrado');
      }

      ciclista.meioDePagamento = novosDadosCartao;
      await ciclista.save();

      return ciclista.meioDePagamento;
    } catch (error) {
      console.error('Erro ao alterar dados do cartão de crédito do ciclista:', error);
      throw new Error('Erro ao alterar dados do cartão de crédito do ciclista');
    }
  }
}

module.exports = Service;
