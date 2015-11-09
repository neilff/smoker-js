import {
  SET_DISPLAY_UNIT,
  SET_THRESHOLD_SETTING,
  SET_GAUGE_TITTLE,
} from '../constants';

import {
  convertFahrenheitToK,
  convertCelciusToK,
} from '../utils/conversion';

const convertToK = {
  F: convertFahrenheitToK,
  C: convertCelciusToK,
};

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
    })
  };
}
