import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import About from './views/About';
import './styles/app.scss';

class App extends Component {
  static propTypes = {
    countryCode: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  handleClick = () => {
    alert('sipspsdfsdf');
  };
  render() {
    return (
      <main className="app">
        <Header onClick={this.handleClick} />
        <Route exact path="/" component={Home} test="mason" />
        <Route path="/about" component={About} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  const { countryCode } = state;
  return {
    countryCode
  };
};

export default connect(mapStateToProps)(App);
