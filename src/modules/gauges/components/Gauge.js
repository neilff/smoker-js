import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  convertKelvinToF,
  convertKelvinToC,
} from 'utils/conversion';

const conversionTable = {
  C: convertKelvinToC,
  F: convertKelvinToF,
};

function mapStateToProps(state, ownProps) {
  const idx = ownProps.idx;
  const convertReading = conversionTable[state.settings.get('displayUnit')];

  return {
    isDisabled: state.gauges.getIn([idx, 'disabled']),
    reading: convertReading(state.gauges.getIn([idx, 'current'])),
    highThreshold: convertReading(state.gauges.getIn([idx, 'high'])).toFixed(),
    lowThreshold: convertReading(state.gauges.getIn([idx, 'low'])).toFixed(),
    measurement: state.settings.get('displayUnit'),
  };
}

function mapDispatchToProps() {
  return {};
}

import GaugeTitle from 'modules/gauges/components/GaugeTitle';
import GaugeMenu from 'modules/gauges/components/GaugeMenu';
import PercentageDonut from 'components/graphs/PercentageDonut';
import TemperatureReading from 'modules/gauges/components/TemperatureReading';
import ThresholdSetting from 'modules/gauges/components/ThresholdSetting';
import Warning from 'modules/gauges/components/Warning';
import TimerDisplay from 'modules/timer/components/TimerDisplay';

const Gauge = (props) => {
  const {
    highThreshold,
    idx,
    isDisabled,
    lowThreshold,
    measurement,
    reading,
  } = props;

  // If the gauge is disabled, return 0 for the current percentage
  const currentPercentage = isDisabled ?
    0 : ((reading - lowThreshold) / (highThreshold - lowThreshold)).toFixed(2) * 100;

  return (
    <div className="relative">
      <GaugeMenu
        idx={ idx }
        disabled={ isDisabled } />

      <div
        className="relative mb4 center"
        style={ isDisabled ? styles.disabled : null }>

        <PercentageDonut
          value={ currentPercentage }
          width={ 300 }
          radius={ 4 }
          primaryColor={ reading < lowThreshold ? '#0074d9' : '#ff4136' }
          secondaryColor={ '#212121' } />

        <TemperatureReading
          measurement={ measurement }
          reading={ isDisabled ? null : reading } />

        <GaugeTitle idx={ idx } />
        <TimerDisplay index={ idx } />

        <ThresholdSetting
          className="left-0"
          idx={ idx }
          target="low"
          value={ lowThreshold }
          color="#0074d9"
          atThreshold={ !isDisabled && reading < lowThreshold }>
          Low Temp
        </ThresholdSetting>

        <ThresholdSetting
          className="right-0"
          idx={ idx }
          target="high"
          value={ highThreshold }
          color="#ff4136"
          atThreshold={ !isDisabled && reading > highThreshold }>
          High Temp
        </ThresholdSetting>
      </div>

      <Warning
        idx={ idx }
        target="low"
        className="white bg-blue"
        isVisible={ !isDisabled && reading < lowThreshold }>
        Low Warning
      </Warning>

      <Warning
        idx={ idx }
        target="high"
        className="white bg-red"
        isVisible={ !isDisabled && reading > highThreshold }>
        High Warning
      </Warning>
    </div>
  );
};

Gauge.displayName = 'Gauge';
Gauge.propTypes = {
  /**
   * The gauges identifier
   */
  idx: PropTypes.string,
  /**
   * Whether the gauge is disabled or not
   */
  isDisabled: PropTypes.bool,
  /**
   * The current reading for the gauge
   */
  reading: PropTypes.number,
  /**
   * The high threshold value for the gauge
   */
  highThreshold: PropTypes.string,
  /**
   * The low threshold value for the gauge
   */
  lowThreshold: PropTypes.string,
  /**
   * The unit of measurment currently set
   */
  measurement: PropTypes.oneOf(['F', 'C']),
};
Gauge.defaultProps = {};

const styles = {
  disabled: {
    opacity: 0.5,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Gauge);
