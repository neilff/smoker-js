import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import jsToImmutable from 'shared/utils/jsToImmutable';

import createStore from 'store/createStore';
import createRoutes from 'store/createRoutes';
import createConnection from 'shared/socket/createConnection';

const store = createStore(jsToImmutable(window.__INITIAL_STATE__ || {}), history);
const history = syncHistoryWithStore(browserHistory, store);
createConnection(store.dispatch);

render(
  <Provider store={ store }>
    <Router history={ history }>
      { createRoutes() }
    </Router>
  </Provider>,
  document.getElementById('root')
);
