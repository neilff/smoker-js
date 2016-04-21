import { fromJS } from 'immutable';
import { GAUGE_PINS } from 'constants';
import {
  TIMER_TICK,
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
} from './actionTypes';

const initialState = GAUGE_PINS.reduce((acc, i) => {
  acc[i] = {
    id: i,
    time: 0,
    timerEnabled: false,
  };

  return acc;
}, {});

export default function timerReducer(state = fromJS(initialState), { type, payload }) {
  switch (type) {
    case TIMER_TICK:
      return state.setIn([payload.id, 'time'], payload.value);

    case START_TIMER:
      return state.setIn([payload.id, 'timerEnabled'], true);

    case STOP_TIMER:
      return state.setIn([payload.id, 'timerEnabled'], false);

    case RESET_TIMER:
      return state.setIn([payload.id, 'time'], 0)
                  .setIn([payload.id, 'timerEnabled'], false);

    default:
      return state;
  }
}
