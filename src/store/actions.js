import axios from 'axios';

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

//GENERIC ASYNC ACTION

export const getData = text => dispatch => {
  console.log(text);
  axios
    .get('https://frankfurter.app/latest?from=GBP&to=USD')
    .then(response => {
      console.log(response);
      dispatch(
        updateCurrency({
          currency: response.data
        })
      );
    })
    .catch(error => error);
};

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
