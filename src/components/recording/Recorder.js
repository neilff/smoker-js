import React, { PropTypes, Component } from 'react';
import { Map } from 'immutable';

import Button from '../common/Button';

class Recorder extends Component {
  static propTypes = {
    defaultTickTime: PropTypes.number.isRequired,
    isRecording: PropTypes.bool.isRequired,
    recordTick: PropTypes.func.isRequired,
    readings: PropTypes.instanceOf(Map),
    resetRecording: PropTypes.func.isRequired,
    startRecording: PropTypes.func.isRequired,
    stopRecording: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isRecording !== this.props.isRecording) {
      if (nextProps.isRecording) {
        this.startPolling();
      } else {
        this.stopPolling();
      }
    }
  }

  componentWillUnmount() {
    this.props.stopRecording();
  }

  render() {
    const {
      isRecording,
      resetRecording,
      stopRecording,
      startRecording,
    } = this.props;

    return (
      <div className="flex-auto">
        {
          isRecording ?
            <Button onClick={ stopRecording }>Pause</Button> :
            <Button onClick={ startRecording }>Start</Button>
        }
        <Button onClick={ resetRecording }>Reset</Button>
      </div>
    );
  }

  stopTime = null;

  requestLatestRecords() {
    const { readings, recordTick } = this.props;

    recordTick(readings);
  }

  startPolling() {
    const { defaultTickTime } = this.props;

    this.requestLatestRecords();
    this.stopTime = setInterval(this.requestLatestRecords.bind(this), defaultTickTime);
  }

  stopPolling() {
    clearInterval(this.stopTime);
  }
}

export default Recorder;
