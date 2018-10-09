import React from 'react';
import ReactDOM from 'react-dom';

//redux

import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './store/reducers.js';

//router

// import { HashRouter } from 'react-router-dom';

//styles

// import './styles/app.scss';

// import App from './App';

import Root from './Root';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer, applyMiddleware(...middleware));

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

ReactDOM.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <Root store={store} />,
  document.getElementById('root')
);
