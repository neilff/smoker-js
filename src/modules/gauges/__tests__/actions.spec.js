import { fromJS } from 'immutable';
import * as actions from '../actions';

const noop = (val) => val;

describe('(Actions) gauges', () => {
  context('toggleMenuVisibility', () => {
    it('should should toggle the visibility of the provided index', () => {
      const getState = () => ({
        gauges: fromJS({ 0: { menuVisible: false } }),
      });

      const action = actions.toggleMenuVisibility(0)(noop, getState);

      expect(action.payload.value).to.equal(true);
    });
  });

  context('setGaugeStatus', () => {
    it('should should toggle whether the gauge is enabled or not', () => {
      const getState = () => ({
        gauges: fromJS({ 0: { disabled: false } }),
      });

      const action = actions.setGaugeStatus(0)(noop, getState);

      expect(action.payload.value).to.equal(true);
    });
  });

  context('setColor', () => {
    it('should dispatch the color of the gauge', () => {
      const action = actions.setColor(0, '#ddd');

      expect(action.payload.value).to.equal('#ddd');
    });
  });

  context('setTitle', () => {
    it('should dispatch the title of the gauge', () => {
      const action = actions.setTitle(0, 'hello');

      expect(action.payload.value).to.equal('hello');
    });
  });

  context('setThreshold', () => {
    it('should dispatch the celcius measurment in Kelvin', () => {
      const getState = () => ({
        settings: fromJS({ displayUnit: 'C' }),
      });

      const action = actions.setThreshold(0, 'high', 100)(noop, getState);

      expect(action.payload.path).to.deep.equal([0, 'high']);
      expect(action.payload.value).to.equal(373.2);
    });

    it('should dispatch the fahrenheit measurment in Kelvin', () => {
      const getState = () => ({
        settings: fromJS({ displayUnit: 'F' }),
      });

      const action = actions.setThreshold(0, 'high', 100)(noop, getState);

      expect(action.payload.path).to.deep.equal([0, 'high']);
      expect(action.payload.value).to.equal(310.9);
    });
  });
});
