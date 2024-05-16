const express = require('express');
const Aluguel = require('../model/aluguelmodel');

const router = express.Router();

router.post('/aluguel', async (req, res) => {
  try {
    const novoAluguel = await Aluguel.create(req.body);
    res.status(201).json(novoAluguel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar aluguel' });
  }
});

module.exports = router;