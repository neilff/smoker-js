import {
  ON_CONNECTED,
  ON_DISCONNECTED,
} from './actionTypes';

export function onConnected(payload) {
  return {
    type: ON_CONNECTED,
    payload,
  };
}

export function onDisconnected() {
  return {
    type: ON_DISCONNECTED,
  };
}
