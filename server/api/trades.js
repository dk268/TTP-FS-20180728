const router = require('express').Router();
const { Trade, Stock } = require('../db/models');
const { IEXClient } = require('iex-api');
const _fetch = require('isomorphic-fetch');

const iex = new IEXClient(_fetch);

// iex.stockCompany('AAPL').then(company => console.log(company));
// iex.stockOpenClose('AAPL').then(company => console.log(company));
// iex.stockPrice('AAPL').then(company => console.log(company));

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
      return `Error: symbol missing`;
    }
    if (currentPrice != req.body.tradePrice) {
      res.status(405).send(`Price has since updated. Please try again.`);
      return `Error: price out of date`;
    }
    const newTrade = await Trade.create({
      ...req.body,
      tradePrice: currentPrice,
    });
    const [updatingStock, wasCreated] = await Stock.findOrCreate({
      where: {
        userId: newTrade.userId,
        stockSymbol: newTrade.tradeSymbol,
      },
    });
    if (wasCreated) {
      const [, updatedStock] = await updatingStock.update(
        {
          stockName: newTrade.tradeName,
          stockCount: newTrade.tradeCount,
          stockPrice: currentPrice,
        },
        {
          returning: true,
          plain: true,
        }
      );
    } else {
      const [, updatedStock] = await updatingStock.update(
        {
          stockCount: this.stockCount + newTrade.tradeCount,
          stockPrice: currentPrice,
        },
        { returning: true, plain: true }
      );
    }
    res.json(newTrade);
    return newTrade;
  } catch (err) {
    next(err);
  }
});
