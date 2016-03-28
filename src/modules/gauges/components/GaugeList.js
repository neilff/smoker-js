import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import {
  convertKelvinToF,
  convertKelvinToC,
} from 'utils/conversion';

const conversionTable = {
  C: convertKelvinToC,
  F: convertKelvinToF,
};

import * as gaugeActions from 'modules/gauges/actions';

function mapStateToProps(state) {
  return {
    gauges: state.gauges,
    displayUnit: state.settings.get('displayUnit'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(gaugeActions, dispatch);
}

import Column from 'components/ui/Column';
import Gauge from 'modules/gauges/components/Gauge';

const GaugeList = (props) => {
  const {
    displayUnit,
    gauges,
    setColor,
    setThreshold,
    setTitle,
    toggleMenuVisibility,
  } = props;

  const convertReading = conversionTable[displayUnit];

  return (
    <div className="flex flex-auto">
      {(() => {
        return gauges.map((i, idx) => {
          const reading = convertReading(i.get('current'));
          const highThreshold = convertReading(i.get('high')).toFixed();
          const lowThreshold = convertReading(i.get('low')).toFixed();
          const gaugeColor = i.get('color');
          const title = i.get('title');
          const menuVisible = i.get('menuVisible');

          return (
            <Column className="flex-auto" key={ idx }>
              <Gauge
                color={ gaugeColor }
                onColorChange={ (val) => setColor(idx, val) }
                onUpdateHighThreshold={ (val) => setThreshold('high', idx, val) }
                highThreshold={ highThreshold }
                onUpdateLowThreshold={ (val) => setThreshold('low', idx, val) }
                lowThreshold={ lowThreshold }
                measurement={ displayUnit }
                reading={ reading }
                onUpdateTitle={ (val) => setTitle(idx, val) }
                toggleMenu={ () => toggleMenuVisibility(idx) }
                menuVisible={ menuVisible }
                title={ title } />
            </Column>
          );
        }).toList();
      })()}
    </div>
  );
};

GaugeList.displayName = 'GaugeList';
GaugeList.propTypes = {
  /**
   * The map of the currently available gauges
   */
  gauges: PropTypes.instanceOf(Map),
  /**
   * The currently selected display unit
   */
  displayUnit: PropTypes.oneOf(['F', 'C']),
  /**
   * Function fired when the color is modified
   */
  setColor: PropTypes.func,
  /**
   * Function fired when the threshold is modified
   */
  setThreshold: PropTypes.func,
  /**
   * Function fired when the title is modified
   */
  setTitle: PropTypes.func,
  /**
   * Function fired when the menu visibility is toggled
   */
  toggleMenuVisibility: PropTypes.func,
};
GaugeList.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeList);
