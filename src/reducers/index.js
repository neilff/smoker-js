import { combineReducers } from 'redux';
import { routerStateReducer  } from 'redux-router';

import readings from './readings';
import settings from './settings';
import socket from './socket';

const rootReducer = combineReducers({
  readings,
  router: routerStateReducer,
  settings,
  socket,
});

export default rootReducer;
