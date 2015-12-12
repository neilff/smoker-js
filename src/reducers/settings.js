import { fromJS } from 'immutable';
import { SOCKET_UPDATE_TIME } from'../../shared';

export const SET_DISPLAY_UNIT = '@@smokerJS/SET_DISPLAY_UNIT';
export const SET_TICK_TIME = '@@smokerJS/SET_TICK_TIME';

const INITIAL_STATE = fromJS({
  displayUnit: 'C',
  defaultTickTime: SOCKET_UPDATE_TIME,
});

export default function settingsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_DISPLAY_UNIT:
    return state.set('displayUnit', payload);

  default:
    return state;
  }
}

export const setConversionType = (type) => ({ type: SET_DISPLAY_UNIT, payload: type });
