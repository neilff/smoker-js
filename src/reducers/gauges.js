import { fromJS } from 'immutable';

import { HIDE_MENUS } from './ui';

import {
  convertFahrenheitToK,
  convertCelciusToK,
} from '../utils/conversion';

const convertToK = {
  F: convertFahrenheitToK,
  C: convertCelciusToK,
};

export const SET_THRESHOLD_SETTING = '@@smokerJS/SET_THRESHOLD_SETTING';
export const SET_GAUGE_TITTLE = '@@smokerJS/SET_GAUGE_TITTLE';
export const SET_MENU_VISIBILITY = '@@smokerJS/SET_MENU_VISIBILITY';

const INITIAL_STATE = fromJS({
  A: {
    high: 305,
    low: 295,
    title: 'Gauge A',
    menuVisible: false,
  },
  B: {
    high: 305,
    low: 295,
    title: 'Gauge B',
    menuVisible: false,
  },
  C: {
    high: 305,
    low: 295,
    title: 'Gauge C',
    menuVisible: false,
  },
});

export default function settingsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_THRESHOLD_SETTING:
    return state.setIn([...payload.path], payload.value);

  case SET_GAUGE_TITTLE:
    return state.setIn([payload.id, 'title'], payload.value);

  case SET_MENU_VISIBILITY:
    return state.setIn([payload.id, 'menuVisible'], payload.value);

  case HIDE_MENUS:
    return state.map(i => i.set('menuVisible', false));

  default:
    return state;
  }
}

export function toggleMenuVisibility(id) {
  return (dispatch, getState) => {
    return dispatch({
      type: SET_MENU_VISIBILITY,
      payload: {
        id,
        value: !getState().gauges.getIn([id, 'menuVisible']),
      },
    });
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
        value: isNaN(value) ?
          convertToK[unit](0) :
          convertToK[unit](value),
      },
    });
  };
}
