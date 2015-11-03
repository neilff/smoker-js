import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';

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
});

export default function configureStore(routes, history, initialState = {}) {
  const store = compose(
    reduxReactRouter({
      routes,
      history,
    }),
    applyMiddleware(
      socketMiddleware,
      logger,
    ),
    devTools(),
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
