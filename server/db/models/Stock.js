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
  stockAmount: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('stockCount') * this.getDataValue('stockPrice');
    },
  },
});

module.exports = Stock;
