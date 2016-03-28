import React from 'react';
import { Route } from 'react-router';

import App from 'containers/App';
import Dashboard from 'containers/Dashboard';

function createRoutes() {
  return (
    <Route component={ App }>
      <Route path="/" component={ Dashboard } />
    </Route>
  );
}

export default createRoutes;
