import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './container components/App';
import rootReducer from './reducers'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const loggerMiddleware = createLogger();

// Configure the store
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);
// console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
