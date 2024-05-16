require('dotenv').config({ path: '.env'  });
const { Sequelize } = require('sequelize');

const nome_banco = process.env.DATABASE_NAME
const user_banco = process.env.DATABASE_USER 
const passwd_banco = process.env.DATABASE_PASSWORD
const host_database = process.env.DATABASE_HOST

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: host_database,
    port: 5432,
    username: user_banco,
    password: passwd_banco,
    database: nome_banco,
});

module.exports = sequelize;