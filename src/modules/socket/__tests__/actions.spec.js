import { fromJS } from 'immutable';
import * as actions from '../actions';

const noop = (val) => val;

describe('(Actions) socket', () => {
  context('onConnected', () => {
    it('should dispatch the connection message', () => {
      const action = actions.onConnected('C');

      expect(action.payload).to.equal('C');
    });
  });
});
