const router = require('express').Router();
const { Trade, Stock } = require('../db/models');
import { IEXClient } from 'iex-api';
import * as _fetch from 'isomorphic-fetch';

const iex = new IEXClient(_fetch);
iex.stockCompany('AAPL').then(company => console.log(company));

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const trades = await Trade.findAll();
    res.json(trades);
  } catch (err) {
    next(err);
  }
});

router.get('/:tradeId', async (req, res, next) => {
  try {
    const singleTrade = await Trade.findById(req.params.tradeId);
    res.json(singleTrade);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newTrade = await Trade.create(req.body);
    const [updatingStock, wasCreated] = await Stock.findOrCreate({
      where: {
        userId: newTrade.userId,
        stockSymbol: newTrade.tradeSymbol,
      },
    });
    if (wasCreated) {
      const [, updatedStock] = await updatingStock.update({
        stockName: newTrade.tradeName,
        stockCount: newTrade.tradeCount,
      });
    }
    res.json(newTrade);
  } catch (err) {
    next(err);
  }
});
