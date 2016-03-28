import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import wait from 'utils/wait';

import { convertKelvinToF } from 'utils/conversion';

import {
  RECORD_TICK,
  START_RECORDING,
} from 'modules/record/actionTypes';

function selectReadings(state) {
  return {
    A: convertKelvinToF(state.gauges.getIn(['A', 'current'])),
    B: convertKelvinToF(state.gauges.getIn(['B', 'current'])),
    C: convertKelvinToF(state.gauges.getIn(['C', 'current'])),
  };
}

function selectRecording(state) {
  return state.record.get('isRecording');
}

function* recorder() {
  yield* takeEvery(START_RECORDING, onStartRecording);
}

function* onStartRecording() {
  const tickTime = yield select(state => state.settings.get('defaultTickTime'));
  const initialReadings = yield select(selectReadings);

  yield put({ type: RECORD_TICK, payload: initialReadings });

  while (true) {
    yield call(wait, tickTime);

    const isRecording = yield select(selectRecording);
    const readings = yield select(selectReadings);

    if (isRecording) {
      yield put({ type: RECORD_TICK, payload: readings });
    } else {
      break;
    }
  }
}

export default recorder;