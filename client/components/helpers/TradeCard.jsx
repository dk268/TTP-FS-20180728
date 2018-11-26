import React, { Component } from 'react';

const TradeCard = props => {
  const { trade } = props;
  console.log(trade);
  return (
    <div className="trade-card">
      <p className="trade-card-p">
        Company: {trade.tradeName} "{trade.tradeSymbol}"
      </p>
      <p className="trade-card-p">Transaction Time: {trade.createdAt}</p>
      <p className="trade-card-p">Transaction amount: ${trade.tradeAmount}</p>
    </div>
  );
};

export default TradeCard;
