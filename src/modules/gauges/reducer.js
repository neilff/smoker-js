import { fromJS } from 'immutable';
import {
  SET_GAUGE_COLOR,
  SET_GAUGE_TITLE,
  SET_MENU_VISIBILITY,
  SET_THRESHOLD_SETTING,
} from './actionTypes';
import { ON_TEMP_UPDATE } from 'constants';
import { ON_CONNECTED } from 'modules/socket/actionTypes';
import { HIDE_MENUS } from 'modules/settings/actionTypes';

const INITIAL_STATE = fromJS({
  A: {
    current: null,
    high: 305,
    low: 295,
    title: 'Gauge A',
    menuVisible: false,
    color: 'red',
  },
  B: {
    current: null,
    high: 305,
    low: 295,
    title: 'Gauge B',
    menuVisible: false,
    color: 'green',
  },
  C: {
    current: null,
    high: 305,
    low: 295,
    title: 'Gauge C',
    menuVisible: false,
    color: 'blue',
  },
});

export default function readingsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ON_CONNECTED:
    case ON_TEMP_UPDATE:
      return state.mergeDeep(fromJS({
        A: {
          current: payload.A,
        },
        B: {
          current: payload.B,
        },
        C: {
          current: payload.C,
        },
      }));

    case SET_THRESHOLD_SETTING:
      return state.setIn([...payload.path], payload.value);

    case SET_GAUGE_COLOR:
      return state.setIn([payload.id, 'color'], payload.value);

    case SET_GAUGE_TITLE:
      return state.setIn([payload.id, 'title'], payload.value);

    case SET_MENU_VISIBILITY:
      return state.setIn([payload.id, 'menuVisible'], payload.value);

    case HIDE_MENUS:
      return state.map(i => i.set('menuVisible', false));

    default:
      return state;
  }
}
