import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as recordActions from 'modules/record/actions';

function mapStateToProps(state) {
  return {
    isRecording: state.record.get('isRecording'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...recordActions,
  }, dispatch);
}

import Button from 'shared/components/ui/Button';

const RecorderControls = (props) => {
  const {
    isRecording,
    resetRecording,
    stopRecording,
    startRecording,
  } = props;

  return (
    <div className="flex-auto">
      {
        isRecording ?
          <Button onClick={ stopRecording } className="h6">Pause</Button> :
          <Button onClick={ startRecording } className="h6">Start</Button>
      }
      <Button onClick={ resetRecording } className="h6">Reset</Button>
    </div>
  );
};

RecorderControls.displayName = 'RecorderControls';
RecorderControls.propTypes = {
  /**
   * Whether the recorder is enabled or not
   */
  isRecording: PropTypes.bool,
  /**
   * Function fired to reset the recording
   */
  resetRecording: PropTypes.func,
  /**
   * Function fired to start the recording
   */
  startRecording: PropTypes.func,
  /**
   * Function fired to stop the recording
   */
  stopRecording: PropTypes.func,
};
RecorderControls.defaultProps = {
  isRecording: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecorderControls);
