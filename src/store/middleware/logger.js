import createLogger from 'redux-logger';
import immutableToJS from 'shared/utils/immutableToJS';

// Blacklisted actions
import { HIDE_MENUS } from 'modules/settings/actionTypes';

// Configure logging middleware
const logger = createLogger({
  collapsed: true,
  stateTransformer: (state) => {
    return immutableToJS(state);
  },
  predicate: (getState, { type }) => {
    // List of actions we want to ignore
    const blacklist = [
      HIDE_MENUS,
    ];

    return blacklist.every(i => type !== i);
  },
});

export default logger;
