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
