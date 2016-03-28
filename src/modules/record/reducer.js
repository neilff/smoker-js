import { fromJS } from 'immutable';
import {
  RECORD_TICK,
  RESET_RECORDING,
  STOP_RECORDING,
  START_RECORDING,
} from './actionTypes';

const INITIAL_STATE = fromJS({
  history: {
    A: [],
    B: [],
    C: [],
  },
  timestamps: [],
  isRecording: false,
});

export default function recordReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case RECORD_TICK:
      return state.updateIn(['timestamps'], i => i.push(new Date()))
                  .updateIn(['history', 'A'], i => i.push(payload.A))
                  .updateIn(['history', 'B'], i => i.push(payload.B))
                  .updateIn(['history', 'C'], i => i.push(payload.C));

    case RESET_RECORDING:
      return INITIAL_STATE;

    case START_RECORDING:
      return state.set('isRecording', true);

    case STOP_RECORDING:
      return state.set('isRecording', false);

    default:
      return state;
  }
}
