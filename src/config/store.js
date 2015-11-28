import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';

import { ON_TEMP_UPDATE } from '../../shared';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { reduxReactRouter } from 'redux-router';
import persistState from 'redux-localstorage';

import socketMiddleware from '../middleware/socket';

import rootReducer from '../reducers';

const logger = createLogger({
  collapsed: true,
  transformer: (state) => {
    const newState = {};
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  },
  predicate: (getState, action) => action.type !== ON_TEMP_UPDATE,
});

const storageConfig = {
  key: 'smokerjs',
  serialize: (state) => JSON.stringify(state.settings.toJS()),
  deserialize: (state) => ({
    settings: Immutable.fromJS(JSON.parse(state)),
  }),
};

export default function configureStore(routes, history, initialState = {}) {
  const store = compose(
    reduxReactRouter({
      routes,
      history,
    }),
    applyMiddleware(
      socketMiddleware,
      thunkMiddleware,
      logger,
    ),
    persistState('settings', storageConfig),
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
