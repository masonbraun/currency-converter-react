import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ username }) => {
  return (
    <header className="header">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </header>
  );
};

Header.propTypes = {
  // username: PropTypes.string.isRequired
  username: PropTypes.string
};

export default Header;
