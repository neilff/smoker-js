import { GAUGE_PINS } from 'constants';
import { fromJS } from 'immutable';
import {
  SET_GAUGE_COLOR,
  SET_GAUGE_TITLE,
  SET_MENU_VISIBILITY,
  SET_THRESHOLD_SETTING,
  SET_GAUGE_STATUS,
} from './actionTypes';
import { ON_TEMP_UPDATE } from 'constants';
import { ON_CONNECTED } from 'modules/socket/actionTypes';
import { HIDE_MENUS } from 'modules/settings/actionTypes';

const initialState = GAUGE_PINS.reduce((acc, i) => {
  acc[i] = {
    id: i,
    current: null,
    high: 305,
    low: 295,
    title: `Gauge ${ i }`,
    menuVisible: false,
    color: 'red',
    disabled: false,
  };

  return acc;
}, {});

export default function gaugesReducer(state = fromJS(initialState), { type, payload }) {
  switch (type) {
    case ON_CONNECTED:
      return state.map((i, idx) => i.set('current', payload[idx]));

    case ON_TEMP_UPDATE:
      return state.setIn([payload.id, 'current'], payload.value);

    case SET_THRESHOLD_SETTING:
      return state.setIn([...payload.path], payload.value);

    case SET_GAUGE_COLOR:
      return state.setIn([payload.id, 'color'], payload.value);

    case SET_GAUGE_TITLE:
      return state.setIn([payload.id, 'title'], payload.value);

    case SET_MENU_VISIBILITY:
      return state.setIn([payload.id, 'menuVisible'], payload.value);

    case SET_GAUGE_STATUS:
      return state.setIn([payload.id, 'disabled'], payload.value);

    case HIDE_MENUS:
      return state.map(i => i.set('menuVisible', false));

    default:
      return state;
  }
}
