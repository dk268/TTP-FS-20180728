const router = require('express').Router();
const { Trade, Stock } = require('../db/models');
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
    console.log('DATA VALUES');
    console.log(req.body);
    const currentPrice = await iex.stockPrice(req.body.tradeSymbol);
    if (!currentPrice) {
      res.status(405).send(`No such stock symbol.`);
      return `Error: symbol missing`;
    }
    if (currentPrice != req.body.tradePrice) {
      res.status(407).send(`Price has since updated. Please try again.`);
      return `Error: price out of date`;
    }
    console.log('before NEW TRADE');
    const newTrade = await Trade.create({
      ...req.body,
      tradePrice: currentPrice * 100,
    });
    console.log('before STOCK FIND OR CREATE');
    const [updatingStock, wasCreated] = await Stock.findOrCreate({
      where: {
        userId: newTrade.userId,
        stockSymbol: newTrade.tradeSymbol,
      },
    });
    console.log('before IF WAS CREATED');
    console.log(updatingStock.dataValues, newTrade.tradeCount, newTrade);
    if (wasCreated) {
      const updatedStock = await updatingStock.update(
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
      const updatedStock = await updatingStock.update(
        {
          stockCount: this.stockCount + newTrade.dataValues.tradeCount,
          stockPrice: currentPrice * 100,
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
