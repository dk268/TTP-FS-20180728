import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Portfolio extends React.component {
  render = () => {
    console.log(props);
    return <h1>hi!</h1>;
  };
}

const mapStateToProps = state => {
  currentUser = state.user;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
