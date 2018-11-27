const router = require('express').Router();
const { Stock } = require('../db/models');
const { IEXClient } = require('iex-api');
const _fetch = require('isomorphic-fetch');
const iex = new IEXClient(_fetch);

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (err) {
    next(err);
  }
});

router.get('/:stockId', async (req, res, next) => {
  try {
    const singleStock = await Stock.findById(req.params.stockId);
    res.json(singleStock);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newStock = await Stock.create(req.body);
    res.json(newStock);
  } catch (err) {
    next(err);
  }
});
