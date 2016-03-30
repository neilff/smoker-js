import { fromJS } from 'immutable';
import {
  ON_CONNECTED,
  ON_DISCONNECTED,
} from './actionTypes';

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
