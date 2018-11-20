const db = require('../db');
const Sequelize = require('sequelize');

const Stock = db.define('stock', {
  stockPrice: {
    type: Sequelize.INTEGER,
  },
  stockSymbol: {
    type: Sequelize.STRING,
  },
  stockName: {
    type: Sequelize.STRING,
  },
  stockCount: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Stock;
