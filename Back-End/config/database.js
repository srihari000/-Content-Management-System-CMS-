// config/database.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: (msg) => console.log(`[Sequelize]: ${msg}`)
});

module.exports = sequelize;