import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOADED, LOADING, UNASKED } from '../store';
import { getTrades } from '../store/trades';
import TradeCard from './helpers/TradeCard';

class Trades extends Component {
  componentDidMount = async () => {
    const { id } = this.props.currentUser;
    await this.props.getTrades(id);
  };

  render = () => {
    const { currentTrades } = this.props;
    if (!currentTrades.collection || !currentTrades.collection.length) {
      return (
        <div id="no-trades-yet-div">
          <h2>
            No trades yet! <Link to="/portfolio">Make one?</Link>
          </h2>
        </div>
      );
    }
    switch (currentTrades.status) {
      case UNASKED:
        return <h3>No stocks yet, I guess...</h3>;
      case LOADING:
        return <h1>Loading...</h1>;
      case LOADED:
        return (
          <div id="trades-master-div">
            {currentTrades.collection.map(trade => (
              <TradeCard
                key={trade.id}
                className="trade-card-map"
                trade={trade}
              />
            ))};
          </div>
        );
      default:
        return <h1> error default </h1>;
    }
  };
}

const mapStateToProps = state => ({
  currentUser: state.user,
  currentTrades: state.trades,
});

const mapDispatchToProps = { getTrades };

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
