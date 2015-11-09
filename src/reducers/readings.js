import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { ON_TEMP_UPDATE } from '../../shared';

const INITIAL_STATE = fromJS({
  A: 0,
  B: 0,
  C: 0,
});

const readingsReducer = handleActions({
  [ON_TEMP_UPDATE]: (state, { payload }) => state.merge(fromJS({
    A: payload.A,
    B: payload.B,
    C: payload.C,
  })),
}, INITIAL_STATE);

export default readingsReducer;
