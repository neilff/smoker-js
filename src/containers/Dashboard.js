import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import {
  setThreshold,
  setTitle,
  toggleMenuVisibility,
} from '../reducers/gauges';

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
    gauges: state.gauges,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveThresholdHigh: (id) => (value) => dispatch(setThreshold('high', id, value)),
    saveThresholdLow: (id) => (value) => dispatch(setThreshold('low', id, value)),
    saveTitle: (id) => (value) => dispatch(setTitle(id, value)),
    toggleMenu: (id) => () => dispatch(toggleMenuVisibility(id)),
  };
};

const Dashboard = (props) => {
  const {
    gauges,
    readings,
    saveThresholdHigh,
    saveThresholdLow,
    saveTitle,
    settings,
    toggleMenu,
  } = props;

  const convertReading = conversionTable[settings.get('displayUnit')];
  const convertedReadings = readings.map(i => conversionTable.F(i));

  const columns = readings.keySeq().map(idx => {
    const reading = convertReading(readings.get(idx, 0));
    const highThreshold = convertReading(gauges.getIn([idx, 'high'])).toFixed();
    const lowThreshold = convertReading(gauges.getIn([idx, 'low'])).toFixed();
    const title = gauges.getIn([idx, 'title']);
    const menuVisible = gauges.getIn([idx, 'menuVisible']);

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
          readings={ convertedReadings } />
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
