import { fromJS } from 'immutable';

import {
  ON_CONNECTED,
  ON_DISCONNECTED,
} from '../../shared';

export const SEND_SOCKET = '@@smoker-js/SEND_SOCKET';

const INITIAL_STATE = fromJS({
  connected: false,
});

export default function socketReducer(state = INITIAL_STATE, { type }) {
  switch (type) {
  case ON_CONNECTED:
    return state.set('connected', true);

  case ON_DISCONNECTED:
    return state.set('connected', false);

  default:
    return state;
  }
}

export function onConnected() {
  return {
    type: ON_CONNECTED,
  };
}

export function onDisconnected() {
  return {
    type: ON_DISCONNECTED,
  };
}

export function onMessage({ type, payload }) {
  return {
    type,
    payload,
  };
}
