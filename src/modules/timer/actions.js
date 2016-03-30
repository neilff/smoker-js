import {
  TIMER_TICK,
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
} from './actionTypes';

export function timerTick(idx, value) {
  return {
    type: TIMER_TICK,
    payload: {
      id: idx,
      value,
    },
  };
}

export function startTimer(idx) {
  return {
    type: START_TIMER,
    payload: {
      id: idx,
    },
  };
}

export function stopTimer(idx) {
  return {
    type: STOP_TIMER,
    payload: {
      id: idx,
    },
  };
}

export function resetTimerState(idx) {
  return {
    type: RESET_TIMER,
    payload: {
      id: idx,
    },
  };
}
