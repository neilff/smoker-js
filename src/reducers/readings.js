import { fromJS } from 'immutable';
import { ON_TEMP_UPDATE } from '../../shared';

const INITIAL_STATE = fromJS({
  A: 273.15,
  B: 273.15,
  C: 273.15,
});

export default function datasetsReducer(state = INITIAL_STATE, { type, payload }) {
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
