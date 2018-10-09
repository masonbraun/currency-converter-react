import { combineReducers } from 'redux';
import { INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS } from './actions.js';

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

const posts = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
};

// const postsBySubreddit = (state = {}, action) => {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return {
//         ...state,
//         [action.subreddit]: posts(state[action.subreddit], action)
//       };
//     default:
//       return state;
//   }

// };

const rootReducer = combineReducers({
  // postsBySubreddit,
  // selectedSubreddit
  // fuckingState
  posts,
  text,
  currency,
  countryCode
});

export default rootReducer;
