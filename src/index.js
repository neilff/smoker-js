require('./styles/base.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import { ReduxRouter } from 'redux-router';

import history from './config/history';
import configureStore from './config/store';
import SocketActions from './actions/socket';
import socket from './config/socket';

import App from './containers/App';
import Display from './containers/Display';
import Config from './containers/Config';

import Button from './components/ui/Button';

const routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Display } />
    <Route
      path="/config"
      component={ Config } />
  </Route>
);

const INITIAL_STATE = window.__INITIAL_STATE__ || {};
console.info('Initial State :: ', INITIAL_STATE);

const store = configureStore(routes, history, INITIAL_STATE);
const actions = bindActionCreators(SocketActions, store.dispatch);

socket.on('connect', actions.onConnected);
socket.on('disconnect', actions.onDisconnected);
socket.on('message', actions.onMessage);

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <ReduxRouter />
    </Provider>
  </div>,
  document.getElementById('root')
);
