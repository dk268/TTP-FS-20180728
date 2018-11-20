'use strict';

const db = require('../server/db');
const { User, Trade, Stock } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      name: 'Cody Endocrine',
      email: 'cody@email.com',
      password: '123',
    }),
    User.create({
      name: 'Murphy Lawson',
      email: 'murphy@email.com',
      password: '123',
    }),
  ]);

  console.log(`seeded ${users.length} users`);

  const trades = await Promise.all([
    Trade.create({
      tradeCount: 4,
      tradeSymbol: 'SMPL1',
      tradeName: 'Sample One',
      tradePrice: 3400,
      userId: 1,
    }),
    {
      tradeCount: 2,
      tradeSymbol: 'SMPL2',
      tradeName: 'Sample Two',
      tradePrice: 2200,
      userId: 1,
    },
    {
      tradeCount: 8,
      tradeSymbol: 'SMPL2',
      tradeName: 'Sample Two',
      tradePrice: 2300,
      userId: 2,
    },
    {
      tradeCount: 1,
      tradeSymbol: 'SMPL3',
      tradeName: 'Sample Three',
      tradePrice: 120,
      userId: 2,
    },
  ]);

  console.log(`seeded ${trades.length} trades`);

  const stocks = await Promise.all([
    Stock.create({
      stockSymbol: 'SMPL1',
      stockName: 'Sample One',
      stockCount: 33,
      stockPrice: 2300,
      userId: 1,
    }),
    Stock.create({
      stockSymbol: 'SMPL2',
      stockName: 'Sample Two',
      stockCount: 22,
      stockPrice: 3321,
      userId: 1,
    }),
    Stock.create({
      stockSymbol: 'SMPL2',
      stockName: 'Sample Two',
      stockCount: 22,
      stockPrice: 3321,
      userId: 2,
    }),
    Stock.create({
      stockSymbol: 'SMPL3',
      stockName: 'Sample Three',
      stockCount: 1,
      stockPrice: 221,
      userId: 2,
    }),
  ]);

  console.log(`seeded ${stocks.length} stocks`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
