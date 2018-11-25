import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email, userName } = props;

  return (
    <div>
      <h3>Welcome, {userName}!</h3>
      <Link to="/portfolio">your portfolio</Link>
      <Link to="/trades">your trades</Link>
      <h4>Signed in under email {email}</h4>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state);
  return {
    email: state.user.email,
    userName: state.user.userName,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
};
