const db = require('../db');
const Sequelize = require('sequelize');

const Trade = db.define('trade', {
  tradeCount: {
    //number of stocks moved
    type: Sequelize.INTEGER,
  },
  tradeSymbol: {
    type: Sequelize.STRING,
  },
  tradeName: {
    type: Sequelize.STRING,
  },
  tradePrice: {
    //price per stock
    type: Sequelize.INTEGER,
  },
  tradeAmount: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('tradeCount') * this.getDataValue('tradePrice');
    },
  },
});

module.exports = Trade;
