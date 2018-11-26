const router = require('express').Router();
const { Trade, Stock, User } = require('../db/models');
const { IEXClient } = require('iex-api');
const _fetch = require('isomorphic-fetch');

const iex = new IEXClient(_fetch);

// iex.stockCompany('AAPL').then(company => console.log(company));
// iex.stockOpenClose('AAPL').then(company => console.log(company));
iex.stockPrice('AAPL').then(company => console.log(company));

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
    const currentPrice = await iex.stockPrice(req.body.tradeSymbol);
    if (!currentPrice) {
      res.status(405).send(`No such stock symbol.`);
      return;
    }
    if (currentPrice != req.body.tradePrice) {
      res.status(406).send('Price has since updated. Please try again.');
      return;
    }
    const currentUser = await User.findById(req.body.userId);
    const moneySpent = req.body.tradeCount * req.body.tradePrice * 100;
    if (moneySpent > currentUser.dataValues.balanceUSCents) {
      res.status(401).send(`Not enough money.`);
      return;
    }
    const newTrade = await Trade.create({
      ...req.body,
      tradePrice: Math.floor(currentPrice * 100),
    });
    const [updatingStock, wasCreated] = await Stock.findOrCreate({
      where: {
        userId: newTrade.userId,
        stockSymbol: newTrade.tradeSymbol,
      },
    });
    if (wasCreated) {
      await updatingStock.update(
        {
          stockName: newTrade.dataValues.tradeName,
          stockCount: newTrade.dataValues.tradeCount * 1,
          stockPrice: currentPrice * 100,
        },
        {
          returning: true,
          plain: true,
        }
      );
    } else {
      const oldCount = updatingStock.dataValues.stockCount;
      await updatingStock.update(
        {
          stockCount: oldCount + newTrade.dataValues.tradeCount,
          stockPrice: currentPrice * 100,
        },
        { returning: true, plain: true }
      );
    }
    await currentUser.spendMoney(moneySpent);
    res.json(newTrade);
  } catch (err) {
    next(err);
  }
});
