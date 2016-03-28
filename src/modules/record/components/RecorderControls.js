import React, { PropTypes } from 'react';

import Button from 'components/ui/Button';

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
  isRecording: PropTypes.bool.isRequired,
  resetRecording: PropTypes.func.isRequired,
  startRecording: PropTypes.func.isRequired,
  stopRecording: PropTypes.func.isRequired,
};
RecorderControls.defaultProps = {
  isRecording: false,
};

export default RecorderControls;
