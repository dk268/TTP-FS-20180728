import React, { Component } from 'react';

const PortfolioCard = props => {
  const { stock } = props;
  const color = undefined;
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
        valued at ${stock.stockPrice / 100} total ${stock.stockAmount / 100}
      </h4>
    </div>
  );
};

export default PortfolioCard;
