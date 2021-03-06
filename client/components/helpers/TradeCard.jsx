import React, { Component } from 'react';

const TradeCard = props => {
  const { trade } = props;
  console.log(trade);
  return (
    <div className="trade-card">
      <p className="trade-card-p trade-card-p-company">
        Company: {trade.tradeName} "{trade.tradeSymbol}"
      </p>
      <p className="trade-card-p trade-card-p-time">
        Transaction Time: {new Date(trade.createdAt).toLocaleString()}
      </p>
      <p className="trade-card-p trade-card-p-transaction">
        Transaction amount: ${trade.tradeAmount % 100
          ? trade.tradeAmount % 10
            ? trade.tradeAmount / 100
            : trade.tradeAmount / 100 + '0'
          : trade.tradeAmount / 100 + '.00'}
      </p>
    </div>
  );
};

export default TradeCard;
