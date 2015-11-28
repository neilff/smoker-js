import { combineReducers } from 'redux';
import { routerStateReducer  } from 'redux-router';

import datasets from './datasets';
import readings from './readings';
import settings from './settings';
import socket from './socket';

const rootReducer = combineReducers({
  datasets,
  readings,
  router: routerStateReducer,
  settings,
  socket,
});

export default rootReducer;
