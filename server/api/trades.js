const router = require('express').Router();
const { Trade } = require('../db/models');
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
    const singleTrade = await Stock.findById(req.params.tradeId);
    res.json(singleTrade);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newTrade = await Trade.create(req.body);
    res.json(newTrade);
  } catch (err) {
    next(err);
  }
});
