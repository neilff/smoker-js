import { fromJS } from 'immutable';

import {
  convertFahrenheitToK,
  convertCelciusToK,
} from '../utils/conversion';

const convertToK = {
  F: convertFahrenheitToK,
  C: convertCelciusToK,
};

export const SET_DISPLAY_UNIT = '@@smokerJS/SET_DISPLAY_UNIT';
export const SET_THRESHOLD_SETTING = '@@smokerJS/SET_THRESHOLD_SETTING';
export const SET_GAUGE_TITTLE = '@@smokerJS/SET_GAUGE_TITTLE';

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

export default function settingsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_DISPLAY_UNIT:
    return state.set('displayUnit', payload);

  case SET_THRESHOLD_SETTING:
    return state.setIn(['gauges', ...payload.path], payload.value);

  case SET_GAUGE_TITTLE:
    return state.setIn(['gauges', payload.id, 'title'], payload.value);

  default:
    return state;
  }
}

export function setConversionType(type) {
  return {
    type: SET_DISPLAY_UNIT,
    payload: type,
  };
}

export function setTitle(id, value) {
  return {
    type: SET_GAUGE_TITTLE,
    payload: {
      id,
      value,
    },
  };
}

export function setThreshold(key, id, value) {
  return (dispatch, getState) => {
    const unit = getState().settings.get('displayUnit');

    return dispatch({
      type: SET_THRESHOLD_SETTING,
      payload: {
        path: [id, key],
        value: convertToK[unit](value),
      },
    });
  };
}
