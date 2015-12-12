import { fromJS } from 'immutable';

export const ON_RECORD_TICK = '@@smokerJS/ON_RECORD_TICK';
export const RESET_RECORDING = '@@smokerJS/RESET_RECORDING';
export const SET_RECORDING_STATE = '@@smokerJS/SET_RECORDING_STATE';

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
  case ON_RECORD_TICK:
    return state.updateIn(['timestamps'], i => i.push(new Date().getTime()))
                .updateIn(['history', 'A'], i => i.push(payload.get('A')))
                .updateIn(['history', 'B'], i => i.push(payload.get('B')))
                .updateIn(['history', 'C'], i => i.push(payload.get('C')));

  case RESET_RECORDING:
    return INITIAL_STATE;

  case SET_RECORDING_STATE:
    return state.set('isRecording', payload);

  default:
    return state;
  }
}

export const onRecordTick = (payload) => ({ type: ON_RECORD_TICK, payload });
export const setRecordingState = (bool) => ({ type: SET_RECORDING_STATE, payload: bool });
export const resetRecordingState = () => ({ type: RESET_RECORDING });
