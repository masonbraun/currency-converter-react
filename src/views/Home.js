import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { alertText, getData } from '../store/actions.js';

//components

import Functional from '../components/Functional';

//assets
import logo from '../assets/images/logo.svg';
// import '../App.scss';

class Home extends Component {
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
    return <section className="home">HOME VIEW</section>;
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
)(Home);
