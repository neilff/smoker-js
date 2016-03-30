import { fromJS } from 'immutable';
import {
  TIMER_TICK,
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
} from './actionTypes';

const INITIAL_STATE = fromJS({
  A: {
    id: 'A',
    time: 0,
    timerEnabled: false,
  },
  B: {
    id: 'B',
    time: 0,
    timerEnabled: false,
  },
  C: {
    id: 'C',
    time: 0,
    timerEnabled: false,
  },
});

export default function timerReducer(state = INITIAL_STATE, { type, payload }) {
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
