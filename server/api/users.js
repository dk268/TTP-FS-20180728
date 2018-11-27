const router = require('express').Router();
const { User, Stock, Trade } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      //avoid sending password or salt...
      attributes: ['id', 'email', `userName`],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/stocks', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [['stockName', 'asc']],
    });
    res.json(stocks);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/trades', async (req, res, next) => {
  try {
    const trades = await Trade.findAll({
      where: {
        userId: req.params.userId,
      },
      order: [['createdAt', 'desc']],
    });
    res.json(trades);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.userId, {
      attributes: ['id', 'email', `name`],
    });
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});
