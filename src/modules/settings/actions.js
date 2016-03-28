import {
  SET_PROFILE_DROPDOWN,
  HIDE_MENUS,
  SET_DISPLAY_UNIT,
} from './actionTypes';

export function toggleProfileDropdown() {
  return (dispatch, getState) => {
    return dispatch({
      type: SET_PROFILE_DROPDOWN,
      payload: !getState().settings.get('profileDropdownVisible'),
    });
  };
}

export function closeAllMenus() {
  return {
    type: HIDE_MENUS,
  };
}

export function setConversionType(unit) {
  return {
    type: SET_DISPLAY_UNIT,
    payload: unit,
  };
}
