import {
  SEND_SOCKET,
} from '../constants';

import {
  ON_CONNECTED,
  ON_DISCONNECTED,
} from '../../shared';

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

export default {
  onConnected,
  onDisconnected,
  onMessage,
};
