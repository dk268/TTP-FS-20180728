import React, { Component } from 'react';

const PortfolioCard = props => {
  console.log(props);
  const { stock } = props;
  let color;
  if (stock.openPrice > stock.currentPrice) color = `red`;
  else if (stock.openPrice < stock.currentPrice) color = `green`;
  else color = `gray`;
  console.log(stock, color);
  console.log(stock, stock.stockName, stock.openPrice);
  return (
    <div className="stocks-map" key={stock.id}>
      <h3 className="stocks-map-h3">
        Company {stock.stockName}{' '}
        <h3 className={`stocks-map-inner-h3 ${color}`}>
          "{stock.stockSymbol}"
        </h3>
      </h3>
      <h4 className="stocks-map-h4">
        Your {stock.stockCount} {stock.stockCount * 1 > 1 ? 'stocks' : 'stock'}{' '}
        valued at{' '}
        <h4 className={`stocks-map-inner-h3 ${color}`}>{stock.currentPrice}</h4>{' '}
        with opening price ${stock.currentPrice} total ${stock.stockAmount /
          100}
      </h4>
    </div>
  );
};

export default PortfolioCard;
