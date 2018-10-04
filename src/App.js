import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//assets
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      billy: 'wassup'
    };
  }
  componentDidMount() {
    // alert('BITCH');
  }
  handleClick() {
    alert('Click happened');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={this.handleClick} />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

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

export default connect(mapStateToProps)(App);
