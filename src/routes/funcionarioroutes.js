const express = require('express');
const funcionarioController = require('../controller/funcionariocontroller');
const f = new funcionarioController();
const router = express.Router();

// Rota para cadastrar funcionario
router.post('/funcionario', async (req, res) => {
    try {
      const novoFuncionario = await f.cadastrarFuncionario(req.body)
      res.status(200).json(novoFuncionario)
    } catch (error) {
      console.error(error);
      res.status(500).json({message : error.message})
    }
})

// Rota para recuperar todos os funcionários
router.get('/funcionario', async (req,res) => {
    try{
        const funcionarios = await f.getFuncionarios()
        res.json({ funcionarios })
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})

// Rota para buscar funcionario por ID
router.get('/funcionario/:id', async (req,res) => {
    try{
        const resultado = await f.getFuncionarioById(req.params.id)
        res.json({ resultado })
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})

// Rota para alterar funcionario
router.put('/funcionario/:id', async (req,res) => {
    try{
        const resultado = await f.alterarFuncionario(req.body,req.params.id)
        res.json({resultado})
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})

// Rota para deletar um funcionario
router.delete('/funcionario/:id', async (req,res) => {
    try{
        const resultado = await f.deletarFuncionario(req.params.id)
        res.json({resultado})
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;