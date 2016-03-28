import persistState from 'redux-localstorage';
import { fromJS } from 'immutable';
import config from '../../../config.json';

// Configure localstorage
const storageConfig = {
  key: config.appTitle,
  serialize: (state) => {
    return state && state.settings && state.gauges ?
      JSON.stringify({
        settings: state.settings.toJS(),
        gauges: state.gauges.toJS(),
      }) : {};
  },
  deserialize: (state) => {
    const store = JSON.parse(state);

    return {
      settings: fromJS(store.settings),
      gauges: fromJS(store.gauges),
    };
  },
};

const localstorage = persistState(['settings', 'gauges'], storageConfig);

export default localstorage;
