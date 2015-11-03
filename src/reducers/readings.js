import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { ON_TEMP_UPDATE } from '../../shared';

const INITIAL_STATE = fromJS({
  tempC: null,
  tempK: null,
  tempF: null,
});

const readingsReducer = handleActions({
  [ON_TEMP_UPDATE]: (state, { payload }) => state.merge(fromJS(payload)),
}, INITIAL_STATE);

export default readingsReducer;
