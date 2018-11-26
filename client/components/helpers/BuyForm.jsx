import { IEXClient } from 'iex-api';
import _fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrade } from '../../store/trades';

const iex = new IEXClient(_fetch);

class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tradeSymbol: '',
      tradeCount: 0,
      symbolTouches: 0,
      countTouches: 0,
      symbolValid: false,
      countValid: false,
      currentPrice: `n/a`,
      errorStatus: '',
      currentCompany: '',
    };
  }

  handleChange = async e => {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.errorStatus) {
      this.setState({ errorStatus: '' });
    }
    if (e.target.name === 'tradeSymbol') {
      let currentCompany = '';
      this.state.symbolTouches++;
      const val = e.target.value;
      const currentPrice = await iex.stockPrice(val);
      currentCompany = await iex.stockCompany(val);
      console.log(currentCompany, val, `current companye`);
      if (currentPrice) {
        this.setState({ currentPrice });
      }
      if (currentPrice && currentPrice !== `Unknown symbol`) {
        this.setState({ currentCompany: currentCompany.companyName });
      }
      if (currentPrice === `Unknown symbol`) {
        this.setState({ currentCompany: '' });
      }
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const [companyInfo, companyPrice] = await Promise.all([
      iex.stockCompany(this.state.tradeSymbol),
      iex.stockPrice(this.state.tradeSymbol),
    ]);
    const res = await this.props.addTrade({
      tradeSymbol: companyInfo.symbol,
      tradeCount: this.state.tradeCount * 1,
      tradeName: companyInfo.companyName,
      tradePrice: this.state.currentPrice,
      userId: this.props.currentUser.id,
    });
    this.setState({
      tradeSymbol: ``,
      tradeCount: 0,
      errorStatus: typeof res == 'string' ? res : '',
    });
  };

  monify = amt => {
    return amt % 100
      ? amt % 10 ? amt / 100 : amt / 100 + '0'
      : amt / 100 + '.00';
  };

  render = () => {
    let currFunds = this.monify(this.props.currentUser.balanceUSCents);
    // currFunds =
    //   currFunds % 100
    //     ? currFunds % 10 ? currFunds / 100 : currFunds / 100 + '0'
    //     : currFunds / 100 + '.00';
    let remainingFunds = currFunds;
    if (
      this.state.currentPrice &&
      this.state.tradeCount &&
      this.state.currentPrice !== 'Unknown symbol'
    ) {
      remainingFunds =
        currFunds - this.state.currentPrice * this.state.tradeCount;
    }
    return (
      <div id="buy-form-div">
        <h1 id="buy-form-money-amount">Your funds: ${currFunds}</h1>
        <form id="buy-form-form" onSubmit={this.handleSubmit}>
          <label htmlFor="tradeSymbol">
            <small>trade symbol</small>
          </label>
          <input
            name="tradeSymbol"
            type="text"
            onChange={this.handleChange}
            value={this.state.tradeSymbol}
          />
          <label htmlFor="tradeCount">
            <small>number of stocks to buy</small>
          </label>
          <input
            name="tradeCount"
            type="number"
            min="0"
            step="1"
            onChange={this.handleChange}
            value={this.state.tradeCount}
          />
          {this.state.currentCompany ? (
            <h3>Company found: {this.state.currentCompany}</h3>
          ) : (
            <h3>Unknown symbol...</h3>
          )}
          <h2>Current price: ${this.state.currentPrice}</h2>
          <h3>
            Total: ${this.state.currentPrice * this.state.tradeCount || 0}
          </h3>
          <button
            id="buy-form-submit-button"
            type="submit"
            disabled={
              !Number.isInteger(this.state.tradeCount * 1) ||
              !this.state.tradeCount ||
              !this.state.tradeSymbol ||
              this.state.currentPrice === `Unknown symbol`
            }
          >
            buy!
          </button>
          <small id="buy-button-error-small" className="red">
            {this.state.errorStatus ? this.state.errorStatus : ''}
          </small>
        </form>
        <h2 id="money-remaining-h2" className={remainingFunds > 0 ? `` : `red`}>
          {remainingFunds > 0
            ? `Money after purchase: $${Math.floor(
                this.monify(remainingFunds * 100) * 100
              ) / 100}`
            : `Money after purchase: -$${Math.floor(
                this.monify(remainingFunds * 100) * 100
              ) /
                100 *
                -1}`}
        </h2>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.user,
});

const mapDispatchToProps = { addTrade };

export default connect(mapStateToProps, mapDispatchToProps)(BuyForm);
