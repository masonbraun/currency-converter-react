import React from 'react';
import PropTypes from 'prop-types';

const Functional = ({ username }) => {
  return <p>The logged in user is: {username}</p>;
};

Functional.propTypes = {
  // username: PropTypes.string.isRequired
  username: PropTypes.string
};

export default Functional;
