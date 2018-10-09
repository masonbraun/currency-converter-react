import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { alertText, getData } from './store/actions.js';
import { Route } from 'react-router-dom';

//components

import Functional from './components/Functional';
import Header from './components/Header';

import Home from './views/Home';
import About from './views/About';

//assets
import logo from './assets/images/logo.svg';
// import './App.scss';
import './styles/app.scss';

class App extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
    // dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      billy: 'wassup'
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // const { dispatch, selectedSubreddit } = this.props;
    // dispatch(fetchPostsIfNeeded(selectedSubreddit));
    // const { dispatch } = this.props;
    this.props.alertText('MOUTNED');
  }
  handleClick = () => {
    this.props.alertText('wassup to');
    this.props.getData();
  };
  render() {
    return (
      <main className="app">
        <Header />
        <header className="App-header">
          <p>i want this on every page</p>
          <Functional username="mason" />
          <img src={logo} className="App-logo" alt="logo" onClick={this.handleClick} />
        </header>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </main>
    );
  }
}

const mapDispatchToProps = {
  getData,
  alertText: value => alertText(value)
};

const mapStateToProps = state => {
  // const { selectedSubreddit, postsBySubreddit } = state;
  // const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
  //   isFetching: true,
  //   items: []
  // };

  const { posts } = state;

  return {
    // selectedSubreddit,
    posts
    // isFetching,
    // lastUpdated
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
