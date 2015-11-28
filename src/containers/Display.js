import React from 'react';
import { connect } from 'react-redux';

import {
  setConversionType,
  setThreshold,
  setTitle,
} from '../reducers/settings';

import {
  convertKelvinToF,
  convertKelvinToC,
} from '../utils/conversion';

const conversionTable = {
  C: convertKelvinToC,
  F: convertKelvinToF,
};

import Column from '../components/common/Column';
import Row from '../components/common/Row';
import Gauge from '../components/gauge/Gauge';
import LineGraph from '../components/graphs/LineGraph';
import Button from '../components/common/Button';

const mapStateToProps = (state) => {
  return {
    readings: state.readings,
    settings: state.settings,
    datasets: state.datasets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveConversionType: (type) => dispatch(setConversionType(type)),
    saveThresholdHigh: (id) => (value) => dispatch(setThreshold('high', id, value)),
    saveThresholdLow: (id) => (value) => dispatch(setThreshold('low', id, value)),
    saveTitle: (id) => (value) => dispatch(setTitle(id, value)),
  };
};

const Dashboard = (props) => {
  const {
    datasets,
    readings,
    saveConversionType,
    saveThresholdHigh,
    saveThresholdLow,
    settings,
    saveTitle,
  } = props;

  const convertReading = conversionTable[settings.get('displayUnit')];

  const gauges = readings.keySeq().map(idx => {
    const reading = convertReading(readings.get(idx));
    const dataset = datasets.get(idx);
    const highThreshold = convertReading(settings.getIn(['gauges', idx, 'high'])).toFixed();
    const lowThreshold = convertReading(settings.getIn(['gauges', idx, 'low'])).toFixed();
    const title = settings.getIn(['gauges', idx, 'title']);

    return (
      <Row>
        <Column className="flex-end" key={ idx }>
          <Gauge
            onUpdateHighThreshold={ saveThresholdHigh(idx) }
            highThreshold={ highThreshold }
            onUpdateLowThreshold={ saveThresholdLow(idx) }
            lowThreshold={ lowThreshold }
            measurement={ settings.get('displayUnit') }
            reading={ reading }
            onUpdateTitle={ saveTitle(idx) }
            title={ title } />
        </Column>
        <Column className="flex-auto">
          <LineGraph height={ 240 } width={ 480 } data={ dataset } />
        </Column>
      </Row>
    );
  });

  return (
    <div>
      <Button className="m1" onClick={ () => saveConversionType('C') }>Celcius</Button>
      <Button className="m1" onClick={ () => saveConversionType('F') }>Fahrenheit</Button>

      { gauges }
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
