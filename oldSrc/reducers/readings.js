import { fromJS } from 'immutable';
import { ON_TEMP_UPDATE } from '../../shared';

const INITIAL_STATE = fromJS({
  A: 255.372, // 0 degrees F
  B: 255.372, // 0 degrees F
  C: 255.372, // 0 degrees F
});

export default function readingsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case ON_TEMP_UPDATE:
    return state.merge(fromJS({
      A: payload.A,
      B: payload.B,
      C: payload.C,
    }));

  default:
    return state;
  }
}
