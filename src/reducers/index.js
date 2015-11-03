import { combineReducers } from 'redux';
import { routerStateReducer  } from 'redux-router';

import readings from './readings';

const rootReducer = combineReducers({
  router: routerStateReducer,
  readings,
});

export default rootReducer;
