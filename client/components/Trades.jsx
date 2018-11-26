import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOADED, LOADING, UNASKED } from '../store';
import { getTrades } from '../store/trades';

class Trades extends Component {
  componentDidMount = async () => {
    const { id } = this.props.currentUser;
    await this.props.getTrades(id);
  };
}

const mapStateToProps = state => ({
  currentUser: state.user,
  currentTrades: state.trades,
});

const mapDispatchToProps = { getTrades };

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
