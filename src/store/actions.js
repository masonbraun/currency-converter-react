import axios from 'axios';
import _ from 'lodash';
import { codes } from '../assets/data/codes';

export const alertText = text => ({
  type: 'UPDATE_TEXT',
  text: text
});

export const updateCurrency = payload => ({
  type: 'UPDATE_CURRENCY',
  currency: payload.currency
});

export const updateCountryCode = countryCode => ({
  type: 'UPDATE_COUNTRY_CODE',
  countryCode
});

//GENERIC ASYNC ACTION

export const getLatestExchangeRates = () => () => {
  return axios
    .get(`https://frankfurter.app/latest`)
    .then(response => response.data)
    .catch(error => error);
};

export const getGeolocationData = coords => dispatch => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${
        coords.longitude
      }&sensor=false&key=AIzaSyDYYRZINtZFs3LuhEN_1RXYj5MutQFizO0`
    )
    .then(response => {
      let countryCode =
        response.data.results[response.data.results.length - 1].address_components[0].short_name;
      let currencyCode = _.find(codes, { code: countryCode }).currency_code;
      return currencyCode;
      // localStorage.setItem('currency_code', currencyCode);
    })
    .catch(error => error);
};

// export const getGeolocationData = coords => dispatch => {
//   console.log(coords);
//   return axios
//     .get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${
//         coords.longitude
//       }&sensor=false&key=AIzaSyDYYRZINtZFs3LuhEN_1RXYj5MutQFizO0`
//     )
//     .then(response => {
//       let countryCode =
//         response.data.results[response.data.results.length - 1].address_components[0].short_name;
//       console.log(countryCode);
//       // return countryCode;
//       // localStorage.setItem('countryCode', countryCode);
//       // dispatch(updateCountryCode(countryCode));

//       let test = _.find(codes, { code: countryCode });

//       console.log(test);

//       dispatch(updateCountryCode(test.currency_code));

//       // this.to = test.currency_code;
//       localStorage.setItem('currency_code', test.currency_code);
//     })
//     .catch(error => error);
// };
