import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>Site Name</h1>
      <nav className="navigation">
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink exact to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
