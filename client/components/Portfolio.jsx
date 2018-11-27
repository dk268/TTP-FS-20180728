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
    const { id } = this.props.currentUser;
    await this.props.getStocks(id);
  };

  handlePurchase = async () => {
    const { id } = this.props.currentUser;
    await this.props.getStocks(id);
  };

  render = () => {
    const { currentStocks } = this.props;
    if (!currentStocks.collection || !currentStocks.collection.length) {
      return (
        <div id="no-stocks-yet-div">
          <h2>No stocks yet! Buy one?</h2>
          <BuyForm handlePurchase={this.handlePurchase} />
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
              <BuyForm handlePurchase={this.handlePurchase} />
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
  currentTrades: state.trades,
});

const mapDispatchToProps = { getStocks };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
