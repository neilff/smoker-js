import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import logger from './middleware/logger';
import sagas from './middleware/sagas';
import localstore from './middleware/localstore';

import rootReducer from './rootReducer';

const middlewares = __DEV__ ?
  [sagas, thunk, logger] :
  [sagas, thunk];

function configureStore(initialState) {
  const createStoreWithMiddleware = compose(
    global && global.localStorage ? localstore : f => f,
    applyMiddleware(...middlewares),
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}

export default configureStore;
