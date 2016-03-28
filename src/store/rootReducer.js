import { combineReducers } from 'redux';

import gauges from 'modules/gauges/reducer';
import record from 'modules/record/reducer';
import settings from 'modules/settings/reducer';
import socket from 'modules/socket/reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  gauges,
  record,
  routing: routerReducer,
  settings,
  socket,
});
