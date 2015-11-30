import { combineReducers } from 'redux';
import { routerStateReducer  } from 'redux-router';

import readings from './readings';
import settings from './settings';
import socket from './socket';
import ui from './ui';

const rootReducer = combineReducers({
  readings,
  router: routerStateReducer,
  settings,
  socket,
  ui,
});

export default rootReducer;
