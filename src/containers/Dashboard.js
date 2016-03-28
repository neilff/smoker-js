import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import * as recordActions from 'modules/record/actions';

function mapStateToProps(state) {
  return {
    gauges: state.gauges,
    isRecording: state.record.get('isRecording'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...recordActions,
  }, dispatch);
}

import Break from 'components/ui/Break';
import GaugeList from 'modules/gauges/components/GaugeList';
import Row from 'components/ui/Row';
import RecorderControls from 'modules/record/components/RecorderControls';
import Legend from 'components/graphs/common/Legend';
import HeatGraph from 'modules/record/components/HeatGraph';

const Dashboard = (props) => {
  const {
    gauges,
    isRecording,
    resetRecordingState,
    startRecording,
    stopRecording,
  } = props;

  return (
    <div>
      <Row>
        <Break title="Temperature Gauges"/>
      </Row>

      <Row>
        <GaugeList />
      </Row>

      <Row>
        <Break title="Heat Graph"/>
      </Row>

      <Row>
        <HeatGraph
          min={ 0 }
          max={ 500 }
          height={ 480 }
          width={ 1024 } />
      </Row>

      <Row>
        <RecorderControls
          isRecording={ isRecording }
          startRecording={ startRecording }
          stopRecording={ stopRecording }
          resetRecording={ resetRecordingState } />
        <Legend gauges={ gauges } />
      </Row>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';
Dashboard.propTypes = {
  /**
   * If the recorder is currently recording or not
   */
  isRecording: PropTypes.bool,
  /**
   * The gauges state
   */
  gauges: PropTypes.instanceOf(Map),
  /**
   * Function to be fired to reset the recording state
   */
  resetRecordingState: PropTypes.func,
  /**
   * Function to be fired to enable recording
   */
  startRecording: PropTypes.func,
  /**
   * Function to be fired to disable recording
   */
  stopRecording: PropTypes.func,
};
Dashboard.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
