const User = require('./User');
const Stock = require('./Stock');
const Trade = require('./Trade');

Stock.belongsTo(User);
Trade.belongsTo(User);
User.hasMany(Stock);
User.hasMany(Trade);

module.exports = {
  User,
  Stock,
  Trade,
};
