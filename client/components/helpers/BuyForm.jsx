import { IEXClient } from 'iex-api';
import _fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrade } from '../../store/trades';

const iex = new IEXClient(_fetch);

(async () => {
  console.log(iex.stockCompany);
  console.log(await iex.stockCompany('AAPL'), await iex.stockCompany('aapl'));
})();

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
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'tradeSymbol') {
      this.state.symbolTouches++;
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const [companyInfo, companyPrice] = await Promise.all([
      iex.stockCompany(this.state.tradeSymbol),
      iex.stockPrice(this.state.tradeSymbol),
    ]);
    await this.props.addTrade({
      tradeSymbol: companyInfo.symbol,
      tradeName: companyInfo.companyName,
      tradePrice: companyPrice,
      userId: this.props.currentUser.id,
    });
    this.setState({
      tradeSymbol: ``,
      tradeCount: 0,
    });
  };

  render = () => {
    return (
      <div id="buy-form-div">
        <form id="buy-form-form" onSubmit={this.handleSubmit}>
          <label htmlFor="tradeSymbol">
            <small>trade symbol</small>
          </label>
          <input name="tradeSymbol" type="text" onChange={this.handleChange} />
          <label htmlFor="tradeCount">
            <small>number of stocks to buy</small>
          </label>
          <input
            name="tradeCount"
            type="number"
            min="0"
            step="1"
            onChange={this.handleChange}
          />
          <button
            id="buy-form-submit-button"
            type="submit"
            disabled={
              !Number.isInteger(this.state.tradeCount * 1) &&
              this.state.tradeCount &&
              this.state.tradeSymbol
            }
          >
            buy!
          </button>
        </form>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  currentUser: state.user,
});

const mapDispatchToProps = { addTrade };

export default connect(mapStateToProps, mapDispatchToProps)(BuyForm);
