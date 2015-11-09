import React from 'react';
import { connect } from 'react-redux';
import { partial } from 'ramda';

import {
  setConversionType,
  setThreshold,
  setTitle,
} from '../actions/settings';

import {
  convertKelvinToF,
  convertKelvinToC,
} from '../utils/conversion';

const conversionTable = {
  C: convertKelvinToC,
  F: convertKelvinToF,
};

import Column from '../components/ui/Column';
import Row from '../components/ui/Row';
import Gauge from '../components/gauge/Gauge';
import Button from '../components/ui/Button';

const mapStateToProps = (state) => {
  return {
    readings: state.readings,
    settings: state.settings,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setConversionType: (type) => dispatch(setConversionType(type)),
    setThresholdHigh: (id) => (value) => dispatch(setThreshold('high', id, value)),
    setThresholdLow: (id) => (value) => dispatch(setThreshold('low', id, value)),
    setTitle: (id) => (value) => dispatch(setTitle(id, value))
  };
}

const Dashboard = (props) => {
  const {
    datasets,
    readings,
    setConversionType,
    setThresholdHigh,
    setThresholdLow,
    settings,
    setTitle,
  } = props;

  const convertReading = conversionTable[settings.get('displayUnit')];

  const gauges = readings.keySeq().map(idx => {
    const reading = convertReading(readings.get(idx));
    const highThreshold = convertReading(settings.getIn(['gauges', idx, 'high'])).toFixed();
    const lowThreshold = convertReading(settings.getIn(['gauges', idx, 'low'])).toFixed();
    const title = settings.getIn(['gauges', idx, 'title']);

    return (
      <Column key={ idx }>
        <Gauge
          onUpdateHighThreshold={ setThresholdHigh(idx) }
          highThreshold={ highThreshold }
          onUpdateLowThreshold={ setThresholdLow(idx) }
          lowThreshold={ lowThreshold }
          measurement={ settings.get('displayUnit') }
          reading={ reading }
          onUpdateTitle={ setTitle(idx) }
          title={ title } />
      </Column>
    );
  });

  return (
    <div>
      <h1>Temperature Reading</h1>
      <hr />

      <Button className="m1" onClick={ () => setConversionType('C') }>Celcius</Button>
      <Button className="m1" onClick={ () => setConversionType('F') }>Fahrenheit</Button>

      <Row>
        { gauges }
      </Row>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
