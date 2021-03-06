import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { alertText, getData, getLatestExchangeRates } from '../store/actions.js';

//components

class About extends Component {
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
    getLatestExchangeRates();
  };
  render() {
    return <section className="about">ABOUT VIEW</section>;
  }
}

const mapDispatchToProps = {
  getLatestExchangeRates,
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
)(About);
