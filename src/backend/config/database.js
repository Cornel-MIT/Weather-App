const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/backend/database.sqlite'
});

module.exports = sequelize;