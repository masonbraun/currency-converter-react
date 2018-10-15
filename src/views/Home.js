import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getLatestExchangeRates, getGeolocationData } from '../store/actions.js';
import _ from 'lodash';
import format from 'format-number';
import { codes } from '../assets/data/codes';

import FormSelect from '../components/FormSelect';
import InputNumber from '../components/InputNumber';
import InputRadio from '../components/InputRadio';

import ButtonCopyToClipboard from '../components/ButtonCopyToClipboard';

import Loader from '../components/Loader';

import CurrencyConverter from '../components/CurrencyConverter';
import ClipboardJS from 'clipboard';

class Home extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: 'GBP',
      toCurrency: '',
      rates: {},
      fetching: true,
      value: '1',
      fee: localStorage.getItem('FXFee') != null ? localStorage.getItem('FXFee') : '1'
    };
  }
  componentDidMount() {
    //check to see if the user has already been geolocated
    let geoLocated = localStorage.getItem('currencyCode') != null ? true : false;

    //if not locate them
    if (!geoLocated) {
      // alert('DO SOME GEOLOCATING');
      this.geoLocate();
    } else {
      this.setState({
        toCurrency: localStorage.getItem('currencyCode'),
        fetching: false
      });

      const clipboard = new ClipboardJS('.btn');

      console.log(clipboard);

      clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        alert('success show succdess thing');

        e.clearSelection();
      });

      clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
    }

    //get the exchange rates from the API
    this.props.getLatestExchangeRates().then(response => {
      console.log(response);
      //set the default rate
      response.rates['EUR'] = 1;
      this.setState({
        rates: response.rates
      });
    });
  }

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

  reset = () => {
    localStorage.clear();
    this.setState({
      fee: '1',
      toCurrency: '',
      fromCurrency: ''
    });
  };

  updateFee = e => {
    this.handleChange(e);
    localStorage.setItem('FXFee', e.target.value);
  };

  swapCurrencies = e => {
    e.preventDefault();
    this.setState({
      toCurrency: this.state.fromCurrency,
      fromCurrency: this.state.toCurrency
    });
  };

  formatNumber = value => {
    console.log(navigator.languages);
    console.log(navigator.languages[0]);

    const options = {
      prefix: this.toCountry.currency_symbol,
      suffix: '',
      round: 2,
      padRight: 2,
      integerSeparator: ',',
      decimal: '.'
    };

    if (this.state.toCurrency == 'EUR') {
      options.integerSeparator = '.';
      options.decimal = ',';
    }

    if (this.state.toCurrency == 'JPY') {
      options.round = 0;
      options.padRight = 0;
    }

    if (isNaN(parseFloat(value))) {
      return '0';
    }

    // return format(options)(value);

    console.log(value);

    return new Intl.NumberFormat(navigator.languages, {
      style: 'currency',
      currencyDisplay: 'symbol',
      useGrouping: true,
      currency: this.state.toCurrency
    }).format(value);
  };

  get toCountry() {
    return _.find(codes, { currency_code: this.state.toCurrency });
  }

  get fromCountry() {
    return _.find(codes, { currency_code: this.state.fromCurrency });
  }

  get finalRates() {
    let baseExchange = 1 / this.state.rates[this.state.fromCurrency];
    let rates = {};
    for (var key in this.state.rates) {
      rates[key] = this.state.rates[key] * baseExchange;
    }
    return rates;
  }

  get finalNumber() {
    return this.state.value * this.finalRates[this.state.toCurrency] * this.state.fee;
  }

  render() {
    return (
      <section className="view view--home">
        {this.state.fetching && <Loader />}
        {!this.state.fetching && (
          <form>
            <FormSelect
              options={this.state.rates}
              handleChange={this.handleChange}
              value={this.state.fromCurrency}
              label="From Currency"
              name="fromCurrency"
            />
            <FormSelect
              options={this.state.rates}
              handleChange={this.handleChange}
              value={this.state.toCurrency}
              label="To Currency"
              name="toCurrency"
            />
            <InputNumber handleChange={this.handleChange} name="value" value={this.state.value} />

            <p className="result">{this.formatNumber(this.finalNumber)}</p>

            <button
              onClick={e => {
                this.swapCurrencies(e);
              }}
            >
              SWAP CURRENCIES
            </button>

            <div className="field">
              <InputRadio id="zero" value="1" label="0%" fee={this.state.fee} handleChange={this.updateFee} />
              <InputRadio id="zero-five" value="1.005" fee={this.state.fee} label="0.5%" handleChange={this.updateFee} />
              <InputRadio id="one" value="1.01" fee={this.state.fee} label="0.1%" handleChange={this.updateFee} />
              <InputRadio id="one-five" value="1.015" fee={this.state.fee} label="0.15%" handleChange={this.updateFee} />
              <InputRadio id="two" value="1.02" fee={this.state.fee} label="0.2%" handleChange={this.updateFee} />
              <InputRadio id="two-five" value="1.025" fee={this.state.fee} label="0.25%" handleChange={this.updateFee} />

              <div className="radio-button">
                <input id="other" type="radio" name="fee" value="" />
                <label htmlFor="other">Other</label>
              </div>
            </div>

            <div id="foo">POOPRRRS</div>

            {/* {!_.isEmpty(this.finalRates) && (
              // <h1>
              //   {this.toCountry.currency_symbol}
              //   {parseFloat(this.state.value * this.finalRates[this.state.toCurrency])}
              // </h1>
              
            )} */}

            <button type="button" onClick={this.reset}>
              RESET
            </button>
            <button className="btn" type="button" data-clipboard-text={this.finalNumber}>
              COPY TO CLIPBOARD
            </button>

            <ButtonCopyToClipboard value={this.finalNumber} />
          </form>
        )}
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
