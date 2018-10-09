import axios from 'axios';
import _ from 'lodash';
import { codes } from '../assets/data/codes';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

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

export const getData = text => dispatch => {
  console.log(text);
  axios
    .get(`https://frankfurter.app/latest?from=GBP&to=${text}`)
    .then(response => {
      dispatch(
        updateCurrency({
          currency: response.data
        })
      );
    })
    .catch(error => error);
};

export const getGeolocationData = coords => dispatch => {
  console.log(coords);
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${
        coords.longitude
      }&sensor=false&key=AIzaSyDYYRZINtZFs3LuhEN_1RXYj5MutQFizO0`
    )
    .then(response => {
      let countryCode =
        response.data.results[response.data.results.length - 1].address_components[0].short_name;
      console.log(countryCode);
      // return countryCode;
      // localStorage.setItem('countryCode', countryCode);
      // dispatch(updateCountryCode(countryCode));

      let test = _.find(codes, { code: countryCode });

      console.log(test);

      dispatch(updateCountryCode(test.currency_code));

      // this.to = test.currency_code;
      localStorage.setItem('currency_code', test.currency_code);
    })
    .catch(error => error);
};

// AIzaSyDYYRZINtZFs3LuhEN_1RXYj5MutQFizO0

// export const invalidateSubreddit = subreddit => ({
//   type: INVALIDATE_SUBREDDIT,
//   subreddit
// });

// export const requestPosts = subreddit => ({
//   type: REQUEST_POSTS,
//   subreddit
// });

// export const receivePosts = (subreddit, json) => ({
//   type: RECEIVE_POSTS,
//   subreddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// });

// const fetchPosts = subreddit => dispatch => {
//   dispatch(requestPosts(subreddit));
//   return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//     .then(response => response.json())
//     .then(json => dispatch(receivePosts(subreddit, json)));
// };

// const shouldFetchPosts = (state, subreddit) => {
//   const posts = state.postsBySubreddit[subreddit];
//   if (!posts) {
//     return true;
//   }
//   if (posts.isFetching) {
//     return false;
//   }
//   return posts.didInvalidate;
// };

// export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
//   if (shouldFetchPosts(getState(), subreddit)) {
//     return dispatch(fetchPosts(subreddit));
//   }
// };
