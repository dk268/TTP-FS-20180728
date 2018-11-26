import React, { Component } from 'react';

const PortfolioCard = props => {
  const { stock } = props;
  let color;
  if (stock.openPrice > stock.currentPrice) color = `red`;
  else if (stock.openPrice < stock.currentPrice) color = `green`;
  else color = `gray`;
  return (
    <div className="stocks-map-master-div">
      <div className="stocks-map" key={stock.id}>
        <div className="stocks-map-div">
          Company Name: {stock.stockName} <br />
          <div className={`stocks-map-inner-div ${color}`}>
            "{stock.stockSymbol}"
          </div>
        </div>
        <div className="stocks-map-div">
          <div className={`stocks-map-current-price-div ${color}`}>
            Current Price: ${stock.currentPrice + ' '}
          </div>{' '}
          Stocks: {stock.stockCount} <br />
          Opening Price: ${stock.openPrice}
        </div>
      </div>
      <div className={`stocks-map-summary-div ${color}-summary`}>
        <h2>Stock: {stock.stockSymbol}</h2>
        <h2>
          Total: ${stock.stockAmount % 100
            ? stock.stockAmount % 10
              ? stock.stockAmount / 100
              : stock.stockAmount / 100 + '0'
            : stock.stockAmount / 100 + '.00'}
        </h2>
      </div>
    </div>
  );
};

export default PortfolioCard;
