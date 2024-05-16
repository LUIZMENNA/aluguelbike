const express = require('express');
const CiclistaController = require('../controller/ciclistacontroller');
const c = new CiclistaController();
const router = express.Router();

router.post('/ciclista', async (req, res) => {
  try {
    const novoCiclista = await c.cadastrarCiclista(req.body);
    res.status(201).json(novoCiclista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/ciclista/existeEmail/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const emailExistente = await c.verificarEmailExistente(email);
    res.json({ emailExistente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/ciclista/:idCiclista/ativar', async (req, res) => {
  const { idCiclista } = req.params;
  try {
    await c.ativarCadastroCiclista(idCiclista);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/ciclista/:idCiclista', async (req, res) => {
  const { idCiclista } = req.params;
  try {
    const ciclista = await c.getCiclistaById(idCiclista);
    res.json(ciclista);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
});

router.get('/cartaoDeCredito/:idCiclista', async (req, res) => {
  const { idCiclista } = req.params;
  try {
    const cartaoDeCredito = await c.getCartaoDeCredito(idCiclista);
    res.json(cartaoDeCredito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/cartaoDeCredito/:idCiclista', async (req, res) => {
  const { idCiclista } = req.params;
  const novosDadosCartao = req.body;
  try {
    const cartaoAtualizado = await c.alterarCartaoDeCredito(idCiclista, novosDadosCartao);
    res.json(cartaoAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;