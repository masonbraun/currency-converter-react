import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Header = ({ onClick }) => {
  return (
    <header className="header">
      <h1 onClick={onClick}>
        <img src={logo} className="App-logo" alt="logo" />
      </h1>
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
