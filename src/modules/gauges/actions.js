import {
  SET_GAUGE_COLOR,
  SET_GAUGE_TITLE,
  SET_MENU_VISIBILITY,
  SET_THRESHOLD_SETTING,
} from './actionTypes';

import {
  convertFahrenheitToK,
  convertCelciusToK,
} from 'utils/conversion';

const convertToK = {
  F: convertFahrenheitToK,
  C: convertCelciusToK,
};

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

export function setColor(id, value) {
  return {
    type: SET_GAUGE_COLOR,
    payload: {
      id,
      value,
    },
  };
}

export function setTitle(id, value) {
  return {
    type: SET_GAUGE_TITLE,
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
