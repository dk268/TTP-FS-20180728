import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOADED, LOADING, UNASKED } from '../store';
import { getStocks } from '../store/stocks';
import BuyForm from './helpers/BuyForm';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    console.log(this.props);
    const { status } = this.props.currentStocks;
    const { id } = this.props.currentUser;
    if (status !== LOADED) this.props.getStocks(id);
  };

  render = () => {
    const { currentStocks } = this.props;
    if (!currentStocks.length)
      return (
        <div id="no-stocks-yet-div">
          <h2>No stocks yet! Buy one?</h2>
          <BuyForm />
        </div>
      );
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
                <h4 key={stock.id}>{stock.amount}</h4>
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
