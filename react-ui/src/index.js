import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './components/App';
import rootReducer from './reducers'
import { fetchPlayedSongs, fetchPlayedSongIfNeeded } from './actions'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

// store
//   .dispatch(fetchPlayedSongIfNeeded()) //   .dispatch(fetchPlayedSongIfNeeded())
//   .then(()=>console.log('state after Played Songs was fetched',store.getState()));

// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
