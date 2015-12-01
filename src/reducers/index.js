import { combineReducers } from 'redux';
import { routerStateReducer  } from 'redux-router';

import gauges from './gauges';
import readings from './readings';
import settings from './settings';
import socket from './socket';
import ui from './ui';

const rootReducer = combineReducers({
  gauges,
  readings,
  router: routerStateReducer,
  settings,
  socket,
  ui,
});

export default rootReducer;
