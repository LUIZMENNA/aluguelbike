require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');
const ciclistaRoutes = require('./routes/ciclistaroutes');
const funcionarioRoutes = require('./routes/funcionarioroutes');
const aluguelRoutes = require('./routes/aluguelroutes');
const base_route = process.env.BASE_ROUTE

const app = express();

app.use(express.json());

// routes
app.use(base_route, ciclistaRoutes);
app.use(base_route, funcionarioRoutes);
app.use(base_route, aluguelRoutes);


//conexão com bancodedados
(async () => {
  try {
    await sequelize.sync();
    console.log('Tabelas sincronizadas com o banco de dados');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error);
  }
})();