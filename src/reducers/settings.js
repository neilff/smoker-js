import { fromJS } from 'immutable';

export const SET_DISPLAY_UNIT = '@@smokerJS/SET_DISPLAY_UNIT';

const INITIAL_STATE = fromJS({
  displayUnit: 'C',
});

export default function settingsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_DISPLAY_UNIT:
    return state.set('displayUnit', payload);

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
