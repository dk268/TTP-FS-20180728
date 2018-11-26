import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOADED, LOADING, UNASKED } from '../store';
import stocks, { getStocks } from '../store/stocks';
import BuyForm from './helpers/BuyForm';
import PortfolioCard from './helpers/PortfolioCard';
import { IEXClient } from 'iex-api';
import _fetch from 'isomorphic-fetch';

const iex = new IEXClient(_fetch);

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    const { status } = this.props.currentStocks;
    const { id } = this.props.currentUser;
    if (status !== LOADED) await this.props.getStocks(id);
    for (let stock of this.props.currentStocks.collection) {
      const returned = await iex.stockOpenClose(stock.stockSymbol);
      stock.openPrice = returned.open.price;
      stock.currentPrice = await iex.stockPrice(stock.stockSymbol);
    }
  };

  render = () => {
    const { currentStocks } = this.props;
    if (!currentStocks.collection || !currentStocks.collection.length) {
      return (
        <div id="no-stocks-yet-div">
          <h2>No stocks yet! Buy one?</h2>
          <BuyForm />
        </div>
      );
    }
    switch (currentStocks.status) {
      case UNASKED:
        return <h3>No stocks yet, I guess...</h3>;
      case LOADING:
        return <h1>Loading...</h1>;
      case LOADED:
        return (
          <div id="portfolio-master-div">
            <div id="portfolio-left-div">
              {currentStocks.collection.map(stock => (
                <PortfolioCard stock={stock} />
              ))}
            </div>
            <div id="portfolio-right-div">
              <BuyForm />
            </div>
          </div>
        );
      default:
        return <h1> error default </h1>;
    }
  };
}

const mapStateToProps = state => ({
  currentUser: state.user,
  currentStocks: state.stocks,
});

const mapDispatchToProps = { getStocks };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
