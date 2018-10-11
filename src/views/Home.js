import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { alertText, getData, getGeolocationData } from '../store/actions.js';
// import Functional from '../components/Functional';
// import InputNumber from '../components/InputNumber';

import FormSelect from '../components/FormSelect';
import CurrencyConverter from '../components/CurrencyConverter';

class Home extends Component {
  static propTypes = {
    countryCode: PropTypes.string.isRequired
    // dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      from: 'GBP',
      to: '',
      value: '',
      rates: {},
      person: 'Mason'
    };
  }
  componentDidMount() {
    let geoLocated = localStorage.getItem('currency_code') != null ? true : false;

    if (!geoLocated) {
      this.geoLocate();
    }

    this.getCurrentExchangeRates();
  }
  handleClick = () => {
    this.props.alertText('wassup to');
    this.props.getData(this.props.countryCode);
  };
  geoLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.getGeolocationData(position.coords);
      });
    }
  };
  // handleChange = (event, key) => {
  //   this.setState({
  //     [key]: event.target.value
  //   });
  // };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  getCurrentExchangeRates = () => {
    axios
      .get(`https://frankfurter.app/latest`)
      .then(response => {
        this.setState({
          rates: response.data.rates,
          to: this.props.countryCode
        });
      })
      .catch(error => error);
  };
  render() {
    return (
      <section className="view">
        <div className="field">
          <form>
            <FormSelect
              options={this.state.rates}
              handleChange={this.handleChange}
              value={this.state.from}
              label="Base Currency"
              name="baseCurrency"
            />
            <p>{this.state.from}</p>
            {/* <InputNumber onChange={e => this.handleChange(e, 'from')} name="from" />
            <InputNumber onChange={e => this.handleChange(e, 'to')} name="to" /> */}
          </form>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  getData,
  getGeolocationData,
  alertText: value => alertText(value)
};

const mapStateToProps = state => {
  // const { selectedSubreddit, postsBySubreddit } = state;
  // const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || {
  //   isFetching: true,
  //   items: []
  // };

  const { countryCode } = state;

  return {
    // selectedSubreddit,
    countryCode
    // isFetching,
    // lastUpdated
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
