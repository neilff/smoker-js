import { fromJS } from 'immutable';
import * as actions from '../actions';

const noop = (val) => val;

describe('(Actions) record', () => {
  context('recordTick', () => {
    it('should dispatch the record value', () => {
      const action = actions.recordTick(0);

      expect(action.payload).to.equal(0);
    });
  });
});
