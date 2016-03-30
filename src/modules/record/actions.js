import {
  RECORD_TICK,
  RESET_RECORDING,
  START_RECORDING,
  STOP_RECORDING,
} from './actionTypes';

export function recordTick(payload) {
  return {
    type: RECORD_TICK,
    payload,
  };
}

export function startRecording() {
  return {
    type: START_RECORDING,
  };
}

export function stopRecording() {
  return {
    type: STOP_RECORDING,
  };
}

export function resetRecordingState() {
  return {
    type: RESET_RECORDING,
  };
}
