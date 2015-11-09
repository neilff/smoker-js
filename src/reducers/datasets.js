import { range } from 'ramda';
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { ON_TEMP_UPDATE } from '../../shared';

import { convertVoltToK } from '../utils/conversion';

const INITIAL_STATE = fromJS({
  A: range(0, 25),
  B: range(0, 25),
  C: range(0, 25),
});

const datasetsReducer = handleActions({
  [ON_TEMP_UPDATE]: (state, { payload }) => {
    return state.updateIn(['A'], list => {
      return list.pop().unshift(fromJS(payload.A));
    });
  },
}, INITIAL_STATE);

export default datasetsReducer;
