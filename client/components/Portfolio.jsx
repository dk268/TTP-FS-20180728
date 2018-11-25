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
    return <h1>Hi!</h1>;
  };
}

const mapStateToProps = state => ({
  currentUser: state.user,
});

const mapDispatchToProps = { getUserStocks };

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
