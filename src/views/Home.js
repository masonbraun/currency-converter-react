import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getLatestExchangeRates, getGeolocationData } from '../store/actions.js';

import FormSelect from '../components/FormSelect';
import InputNumber from '../components/InputNumber';

import CurrencyConverter from '../components/CurrencyConverter';

class Home extends Component {
  static propTypes = {
    // countryCode: PropTypes.string.isRequired
    // dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: '',
      toCurrency: '',
      rates: {},
      fetching: true,
      value: '0'
    };
  }
  componentDidMount() {
    //check to see if the user has already been geolocated
    let geoLocated = localStorage.getItem('currencyCode') != null ? true : false;

    //if not locate them
    if (!geoLocated) {
      alert('DO SOME GEOLOCATING');
      this.geoLocate();
    } else {
      this.setState({
        toCurrency: localStorage.getItem('currencyCode'),
        fetching: false
      });
    }

    //get the exchange rates from the API
    this.props.getLatestExchangeRates().then(response => {
      //set the default rate
      response.rates['EUR'] = 1;
      this.setState({
        rates: response.rates
      });
    });
  }
  handleClick = () => {
    this.props.alertText('wassup to');
    // this.props.getData(this.props.countryCode);
  };
  geoLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.getGeolocationData(position.coords).then(response => {
          localStorage.setItem('currencyCode', response);
          this.setState({
            toCurrency: response,
            fetching: false
          });
        });
      });
    } else {
      alert('BROWSER GEOLOCATION DISABLED');
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  //computed property
  get computedProp() {
    return Object.keys(this.state.rates).map(option => option);
  }

  get finalRates() {
    let baseExchange = 1 / this.state.rates[this.state.fromCurrency];
    let rates = {};
    for (var key in this.state.rates) {
      rates[key] = this.state.rates[key] * baseExchange;
    }
    return rates;
  }

  render() {
    return (
      <section className="view view--home">
        <h1>{parseFloat(this.state.value * this.finalRates[this.state.toCurrency]).toFixed(2)}</h1>
        <form>
          <FormSelect
            options={this.state.rates}
            handleChange={this.handleChange}
            value={this.state.fromCurrency}
            label="From Currency"
            name="fromCurrency"
          />

          <p>asdfsdf {this.computedProp[0]}</p>

          {!this.state.toCurrency == '' && (
            <div>
              <p>NOT FETCHING</p>
              <FormSelect
                options={this.state.rates}
                handleChange={this.handleChange}
                value={this.state.toCurrency}
                label="To Currency"
                name="toCurrency"
              />
            </div>
          )}

          <InputNumber handleChange={this.handleChange} name="value" />
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = {
  getLatestExchangeRates,
  getGeolocationData
  // alertText: value => alertText(value)
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
    // countryCode
    // isFetching,
    // lastUpdated
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
