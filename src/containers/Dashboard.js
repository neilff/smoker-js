import React from 'react';
import { connect } from 'react-redux';

import {
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
import HeatGraph from '../components/graphs/HeatGraph';
import Break from '../components/common/Break';

const mapStateToProps = (state) => {
  return {
    readings: state.readings,
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveThresholdHigh: (id) => (value) => dispatch(setThreshold('high', id, value)),
    saveThresholdLow: (id) => (value) => dispatch(setThreshold('low', id, value)),
    saveTitle: (id) => (value) => dispatch(setTitle(id, value)),
  };
};

const Dashboard = (props) => {
  const {
    readings,
    saveThresholdHigh,
    saveThresholdLow,
    settings,
    saveTitle,
  } = props;

  const convertReading = conversionTable[settings.get('displayUnit')];
  const convertedReadings = readings.map(i => conversionTable.F(i));

  const gauges = readings.keySeq().map(idx => {
    const reading = convertReading(readings.get(idx, 0));
    const highThreshold = convertReading(settings.getIn(['gauges', idx, 'high'])).toFixed();
    const lowThreshold = convertReading(settings.getIn(['gauges', idx, 'low'])).toFixed();
    const title = settings.getIn(['gauges', idx, 'title']);

    return (
      <Column className="flex-auto" key={ idx }>
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
    );
  });

  return (
    <div>
      <Row>
        <Break title="Temperature Gauges"/>
      </Row>

      <Row>
        { gauges }
      </Row>

      <Row>
        <Break title="Heat Graph"/>
      </Row>

      <Row>
        <HeatGraph
          min={ 0 }
          max={ 500 }
          height={ 480 }
          width={ 1024 }
          readings={ convertedReadings } />
      </Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
