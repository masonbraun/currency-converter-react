import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './store/reducers.js';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Root from './Root';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
