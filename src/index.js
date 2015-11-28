require('./styles/base.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import { ReduxRouter } from 'redux-router';

import history from './config/history';
import configureStore from './config/store';
import socket from './config/socket';

import {
  onConnected,
  onDisconnected,
  onMessage,
} from './reducers/socket';

import App from './containers/App';
import Display from './containers/Display';
import Config from './containers/Config';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Display } />
    <Route path="/config" component={ Config } />
  </Route>
);

const INITIAL_STATE = window.__INITIAL_STATE__ || {};

console.info('Initial State :: ', INITIAL_STATE);

const store = configureStore(routes, history, INITIAL_STATE);

const socketActions = bindActionCreators({
  onConnected,
  onDisconnected,
  onMessage,
}, store.dispatch);

socket.on('connect', socketActions.onConnected);
socket.on('disconnect', socketActions.onDisconnected);
socket.on('message', socketActions.onMessage);

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <ReduxRouter />
    </Provider>
  </div>,
  document.getElementById('root')
);
