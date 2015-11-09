import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  SET_DISPLAY_UNIT,
  SET_THRESHOLD_SETTING,
  SET_GAUGE_TITTLE,
} from '../constants';

const INITIAL_STATE = fromJS({
  displayUnit: 'C',
  gauges: {
    A: {
      high: 305,
      low: 295,
      title: 'Gauge A',
    },
    B: {
      high: 305,
      low: 295,
      title: 'Gauge B',
    },
    C: {
      high: 305,
      low: 295,
      title: 'Gauge C',
    },
  },
});

const settingsReducer = handleActions({
  [SET_DISPLAY_UNIT]: (state, { payload }) => state.set('displayUnit', payload),
  [SET_THRESHOLD_SETTING]: (state, { payload }) => state.setIn(['gauges', ...payload.path], payload.value),
  [SET_GAUGE_TITTLE]: (state, { payload }) => state.setIn(['gauges', payload.id, 'title'], payload.value),
}, INITIAL_STATE);

export default settingsReducer;
