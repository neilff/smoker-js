import { fromJS } from 'immutable';
import * as actions from '../actions';

const noop = (val) => val;

describe('(Actions) settings', () => {
  context('toggleProfileDropdown', () => {
    it('should toggle whether the profile dropdown is visible or not', () => {
      const getState = () => ({
        settings: fromJS({ profileDropdownVisible: false }),
      });

      const action = actions.toggleProfileDropdown(0)(noop, getState);

      expect(action.payload).to.equal(true);
    });
  });

  context('setConversionType', () => {
    it('should dispatch the conversion value', () => {
      const action = actions.setConversionType('C');

      expect(action.payload).to.equal('C');
    });
  });
});
