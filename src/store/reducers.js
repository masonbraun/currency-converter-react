import { combineReducers } from 'redux';

const text = (state = 'default', action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return action.text;
    default:
      return state;
  }
};

const currency = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENCY':
      return action.currency;
    default:
      return state;
  }
};

const countryCode = (state = localStorage.getItem('currency_code'), action) => {
  switch (action.type) {
    case 'UPDATE_COUNTRY_CODE':
      return action.countryCode;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  text,
  currency,
  countryCode
});

export default rootReducer;
