import { fromJS } from 'immutable';

export const SET_PROFILE_DROPDOWN = '@@smokerJS/SET_PROFILE_DROPDOWN';
export const HIDE_MENUS = '@@smokerJS/HIDE_MENUS';

const INITIAL_STATE = fromJS({
  profileDropdownVisible: false,
});

export default function socketReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SET_PROFILE_DROPDOWN:
    return state.set('profileDropdownVisible', payload);

  case HIDE_MENUS:
    return state.map(() => false);

  default:
    return state;
  }
}

export function toggleProfileDropdown() {
  return (dispatch, getState) => {
    return dispatch({
      type: SET_PROFILE_DROPDOWN,
      payload: !getState().ui.get('profileDropdownVisible'),
    });
  };
}

export function closeAllMenus() {
  return { type: HIDE_MENUS };
}
