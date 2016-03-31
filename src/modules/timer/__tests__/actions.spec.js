import { fromJS } from 'immutable';
import * as actions from '../actions';

const noop = (val) => val;

describe('(Actions) timer', () => {
  context('timerTick', () => {
    it('should dispatch a timer tick', () => {
      const action = actions.timerTick(0, 100);

      expect(action.payload.id).to.equal(0);
      expect(action.payload.value).to.equal(100);
    });
  });
});
