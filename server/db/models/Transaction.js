const db = require('../db');
const Sequelize = require('sequelize');

const Trade = db.define('trade', {
  amount: {
    type: Sequelize.INTEGER,
  },
  companySymbol: {
    type: Sequelize.STRING,
  },
  companyName: {
    type: Sequelize.STRING,
  },
  companyPrice: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Trade;
