import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { alertText, getData } from './store/actions.js';

//assets
import logo from './assets/images/logo.svg';
import './App.scss';

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
