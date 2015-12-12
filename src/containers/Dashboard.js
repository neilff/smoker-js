import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import {
  setColor,
  setThreshold,
  setTitle,
  toggleMenuVisibility,
} from '../reducers/gauges';

import { setRecordingState, resetRecordingState, onRecordTick } from '../reducers/record';

import {
  convertKelvinToF,
  convertKelvinToC,
} from '../utils/conversion';

const conversionTable = {
  C: convertKelvinToC,
  F: convertKelvinToF,
};

import Break from '../components/common/Break';
import Column from '../components/common/Column';
import Gauge from '../components/gauge/Gauge';
import HeatGraph from '../components/graphs/HeatGraph';
import Legend from '../components/graphs/common/Legend';
import Recorder from '../components/recording/Recorder';
import Row from '../components/common/Row';

const mapStateToProps = (state) => {
  return {
    gauges: state.gauges,
    readings: state.readings,
    record: state.record,
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recordTick: (payload) => dispatch(onRecordTick(payload)),
    resetRecording: () => dispatch(resetRecordingState()),
    saveColor: (id) => (value) => dispatch(setColor(id, value)),
    saveThresholdHigh: (id) => (value) => dispatch(setThreshold('high', id, value)),
    saveThresholdLow: (id) => (value) => dispatch(setThreshold('low', id, value)),
    saveTitle: (id) => (value) => dispatch(setTitle(id, value)),
    startRecording: () => dispatch(setRecordingState(true)),
    stopRecording: () => dispatch(setRecordingState(false)),
    toggleMenu: (id) => () => dispatch(toggleMenuVisibility(id)),
  };
};

const Dashboard = (props) => {
  const {
    gauges,
    recordTick,
    readings,
    record,
    resetRecording,
    saveColor,
    saveThresholdHigh,
    saveThresholdLow,
    saveTitle,
    settings,
    startRecording,
    stopRecording,
    toggleMenu,
  } = props;

  const convertReading = conversionTable[settings.get('displayUnit')];
  const convertedReadings = readings.map(i => conversionTable.F(i));
  const convertedHistory = record.get('history');
  const heatGraphColors = gauges.map(i => i.get('color'));

  const columns = readings.keySeq().map(idx => {
    const reading = convertReading(readings.get(idx, 0));
    const highThreshold = convertReading(gauges.getIn([idx, 'high'])).toFixed();
    const lowThreshold = convertReading(gauges.getIn([idx, 'low'])).toFixed();
    const gaugeColor = gauges.getIn([idx, 'color']);
    const title = gauges.getIn([idx, 'title']);
    const menuVisible = gauges.getIn([idx, 'menuVisible']);

    return (
      <Column className="flex-auto" key={ idx }>
        <Gauge
          color={ gaugeColor }
          onColorChange={ saveColor(idx) }
          onUpdateHighThreshold={ saveThresholdHigh(idx) }
          highThreshold={ highThreshold }
          onUpdateLowThreshold={ saveThresholdLow(idx) }
          lowThreshold={ lowThreshold }
          measurement={ settings.get('displayUnit') }
          reading={ reading }
          onUpdateTitle={ saveTitle(idx) }
          toggleMenu={ toggleMenu(idx) }
          menuVisible={ menuVisible }
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
        { columns }
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
          colors={ heatGraphColors }
          readings={ convertedHistory }
          defaultTickTime={ settings.get('defaultTickTime') }
          timestamps={ record.get('timestamps') } />
      </Row>

      <Row>
        <Recorder
          gauges={ gauges }
          recordTick={ recordTick }
          readings={ convertedReadings }
          isRecording={ record.get('isRecording') }
          startRecording={ startRecording }
          stopRecording={ stopRecording }
          resetRecording={ resetRecording }
          defaultTickTime={ settings.get('defaultTickTime') } />
        <Legend gauges={ gauges } />
      </Row>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';
Dashboard.propTypes = {
  gauges: PropTypes.instanceOf(Map).isRequired,
  readings: PropTypes.instanceOf(Map).isRequired,
  saveThresholdHigh: PropTypes.func.isRequired,
  saveThresholdLow: PropTypes.func.isRequired,
  saveTitle: PropTypes.func.isRequired,
  settings: PropTypes.instanceOf(Map).isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
Dashboard.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
