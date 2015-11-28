import { range } from 'ramda';
import { fromJS } from 'immutable';
import { ON_TEMP_UPDATE } from '../../shared';

const INITIAL_STATE = fromJS({
  A: range(0, 25),
  B: range(0, 25),
  C: range(0, 25),
});

export default function datasetsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case ON_TEMP_UPDATE:
    return state
      .updateIn(['A'], list => list.shift().push(fromJS(payload.A)))
      .updateIn(['B'], list => list.shift().push(fromJS(payload.B)))
      .updateIn(['C'], list => list.shift().push(fromJS(payload.C)));

  default:
    return state;
  }
}
