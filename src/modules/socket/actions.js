import {
  ON_CONNECTED,
  ON_DISCONNECTED,
  ON_ERROR,
  ON_RECONNECT,
  ON_RECONNECTING,
  ON_RECONNECT_ERROR,
  ON_RECONNECT_FAILED,
} from './actionTypes';

export function onConnected(params) {
  return {
    type: ON_CONNECTED,
    payload: params,
  };
}

export function onDisconnected(params) {
  return {
    type: ON_DISCONNECTED,
    payload: params,
  };
}

export function onError(params) {
  return {
    type: ON_ERROR,
    payload: params,
  };
}

export function onReconnect(params) {
  return {
    type: ON_RECONNECT,
    payload: params,
  };
}

export function onReconnecting(params) {
  return {
    type: ON_RECONNECTING,
    payload: params,
  };
}

export function onReconnectError(params) {
  return {
    type: ON_RECONNECT_ERROR,
    payload: params,
  };
}

export function onReconnectFailed(params) {
  return {
    type: ON_RECONNECT_FAILED,
    payload: params,
  };
}
