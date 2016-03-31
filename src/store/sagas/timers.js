import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import wait from 'shared/utils/wait';

import { START_TIMER } from 'modules/timer/actionTypes';
import { timerTick } from 'modules/timer/actions';

const TICK_TIME = 1000;

function getEnabled(idx) {
  return (state) => state.timer.getIn([idx, 'timerEnabled']);
}

function getCurrentTimer(idx) {
  return (state) => state.timer.getIn([idx, 'time'], 0);
}

function* recorder() {
  yield* takeEvery(START_TIMER, onStartTimer);
}

function* onStartTimer({ payload }) {
  while (true) {
    yield call(wait, TICK_TIME);

    const isEnabled = yield select(getEnabled(payload.id));
    const time = yield select(getCurrentTimer(payload.id));

    if (isEnabled) {
      yield put(timerTick(payload.id, time + 1000));
    } else {
      break;
    }
  }
}

export default recorder;
