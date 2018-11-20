const db = require('../db');
const Sequelize = require('sequelize');

const Trade = db.define('trade', {
  tradeAmount: {
    type: Sequelize.INTEGER,
  },
  tradeSymbol: {
    type: Sequelize.STRING,
  },
  tradeName: {
    type: Sequelize.STRING,
  },
  tradePrice: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Trade;
