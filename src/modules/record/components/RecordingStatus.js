import React, { PropTypes } from 'react';

const RecordingStatus = ({ isRecording }) => {
  return (
    <div className="red flex flex-center">
      {
        isRecording ?
          <span className="icon ion-record"></span> :
          null
      }
    </div>
  );
};

RecordingStatus.displayName = 'RecordingStatus';
RecordingStatus.propTypes = {
  isRecording: PropTypes.bool.isRequired,
};

export default RecordingStatus;
