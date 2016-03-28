import { fromJS } from 'immutable';
import {
  HIDE_MENUS,
  SET_PROFILE_DROPDOWN,
  SET_DISPLAY_UNIT,
} from './actionTypes';
import { SOCKET_UPDATE_TIME } from 'constants';

const INITIAL_STATE = fromJS({
  dropdowns: {
    profileVisible: false,
  },
  displayUnit: 'C',
  defaultTickTime: SOCKET_UPDATE_TIME,
});

export default function socketReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case HIDE_MENUS:
      return state.updateIn(['dropdowns'], i => i.map(() => false));

    case SET_DISPLAY_UNIT:
      return state.set('displayUnit', payload);

    case SET_PROFILE_DROPDOWN:
      return state.setIn(['dropdowns', 'profileVisible'], payload);

    default:
      return state;
  }
}
