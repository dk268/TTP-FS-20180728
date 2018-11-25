import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserStocks, LOADED, LOADING } from '../store';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { status } = this.props.currentUser.stocks;
    const { id } = this.props.currentUser;
    if (status !== LOADED) {
      this.props.getUserStocks(id);
    }
  };

  render = () => {
    const { status } = this.props.currentUser.stocks;
    const { stocks } = this.props.currentUser;
    switch (status) {
      case LOADING:
        return <h1>Loading...</h1>;
      case LOADED:
        return (
          <div id="portfolio-master-div">
            <div id="portfolio-left-div">
              {stocks.collection.map(stock => (
                <h4 key={stock.id}>{stock.amount}</h4>
              ))}
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
});

const mapDispatchToProps = { getUserStocks };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
